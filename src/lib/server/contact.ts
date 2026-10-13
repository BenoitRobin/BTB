import { fail, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { CONTACT_TYPES } from '$lib/data/contact';
import { BINGO_SQUARES } from '$lib/data/bingo';

/** `bingo`: squares ticked on /bingo, sent along with the message (empty from the home page). */
export type ContactValues = {
	type: string;
	name: string;
	email: string;
	message: string;
	bingo: string[];
};
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(formData: FormData) {
	// Browsers submit line breaks as \r\n but count them as one character for maxlength: match that.
	const field = (key: string) =>
		String(formData.get(key) ?? '')
			.replace(/\r\n/g, '\n')
			.trim();
	const values: ContactValues = {
		type: field('type'),
		name: field('name'),
		email: field('email'),
		message: field('message'),
		// Only known square labels get through, so the e-mail can't carry arbitrary extra text.
		bingo: (BINGO_SQUARES as readonly string[]).filter((square) =>
			formData.getAll('bingo').includes(square)
		)
	};

	const errors: ContactErrors = {};
	if (!(CONTACT_TYPES as readonly string[]).includes(values.type)) {
		errors.type = 'Dis-nous si tu es fanfaron ou bénévole.';
	}
	if (!values.name) errors.name = 'Comment tu t’appelles ?';
	else if (values.name.length > 100) errors.name = 'Un peu long, ce nom (100 caractères max).';
	if (!EMAIL_PATTERN.test(values.email))
		errors.email = 'Il nous faut une adresse valide pour te répondre.';
	if (values.message.length < 10)
		errors.message = 'Dis-nous en un peu plus (10 caractères minimum).';
	else if (values.message.length > 5000)
		errors.message = 'Message trop long (5000 caractères max).';

	return { values, errors };
}

// shortcut: spam protection is only a honeypot field, no rate limiting; add Vercel Firewall rules or Cloudflare Turnstile if spam gets through.
export function isSpam(formData: FormData) {
	return String(formData.get('website') ?? '') !== '';
}

/**
 * Sends the message through Resend's REST API. Never throws.
 * Until the bougetonbouble.fr domain is verified in Resend, CONTACT_FROM stays on onboarding@resend.dev,
 * which can only deliver to the Resend account's own address (CONTACT_TO).
 */
export async function sendContactEmail(
	fetch: typeof globalThis.fetch,
	values: ContactValues
): Promise<boolean> {
	if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
		console.error('Contact form: RESEND_API_KEY or CONTACT_TO is not configured');
		return false;
	}
	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM || 'Bouge Ton Bouble <onboarding@resend.dev>',
				to: env.CONTACT_TO,
				reply_to: values.email,
				subject: `[${values.type}]${values.bingo.length ? ' [Bingo]' : ''} Message de ${values.name} — site Bouge Ton Bouble`,
				text:
					`Type : ${values.type}\nNom : ${values.name}\nEmail : ${values.email}\n\n${values.message}` +
					(values.bingo.length
						? `\n\nGrille bingo (${values.bingo.length}/${BINGO_SQUARES.length}) :\n${values.bingo.map((square) => `- ${square}`).join('\n')}`
						: '')
			})
		});
		if (!res.ok) {
			console.error('Resend error', res.status, await res.text());
			return false;
		}
		return true;
	} catch (error) {
		console.error('Resend request failed', error);
		return false;
	}
}

/** The `contact` form action, shared by the home page and /bingo (both render `ContactForm`). */
export async function contactAction({ request, fetch }: RequestEvent) {
	const formData = await request.formData();
	// Pretend it worked so bots don't learn to skip the honeypot.
	if (isSpam(formData)) return { success: true as const };

	const { values, errors } = validateContact(formData);
	if (Object.keys(errors).length) return fail(400, { values, errors });

	if (!(await sendContactEmail(fetch, values))) {
		return fail(502, { values, sendFailed: true as const });
	}
	return { success: true as const };
}

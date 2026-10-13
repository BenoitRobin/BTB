import { env } from '$env/dynamic/private';

export const CONTACT_TYPES = ['Fanfare', 'Bénévole', 'Autre'] as const;

/** Shown to the visitor only when sending fails, so they still have a way to reach us. */
export const PUBLIC_CONTACT_EMAIL = 'contact@bougetonbouble.fr';

export type ContactValues = { type: string; name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(formData: FormData) {
	const field = (key: string) => String(formData.get(key) ?? '').trim();
	const values: ContactValues = {
		type: field('type'),
		name: field('name'),
		email: field('email'),
		message: field('message')
	};

	const errors: ContactErrors = {};
	if (!(CONTACT_TYPES as readonly string[]).includes(values.type)) {
		errors.type = 'Dis-nous si tu es une fanfare, un·e bénévole ou autre chose.';
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
				subject: `[${values.type}] Message de ${values.name} — site Bouge Ton Bouble`,
				text: `Type : ${values.type}\nNom : ${values.name}\nEmail : ${values.email}\n\n${values.message}`
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

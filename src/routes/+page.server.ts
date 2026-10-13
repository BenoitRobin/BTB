import { fail } from '@sveltejs/kit';
import { getInstagramPosts } from '$lib/server/instagram';
import {
	PUBLIC_CONTACT_EMAIL,
	isSpam,
	sendContactEmail,
	validateContact
} from '$lib/server/contact';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Vercel's CDN serves the page for an hour, so Instagram is called at most once an hour.
	setHeaders({ 'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400' });
	return { instagramPosts: await getInstagramPosts(fetch) };
};

export const actions: Actions = {
	contact: async ({ request, fetch }) => {
		const formData = await request.formData();
		// Pretend it worked so bots don't learn to skip the honeypot.
		if (isSpam(formData)) return { success: true };

		const { values, errors } = validateContact(formData);
		if (Object.keys(errors).length) return fail(400, { values, errors });

		if (!(await sendContactEmail(fetch, values))) {
			return fail(502, { values, sendFailed: true, fallbackEmail: PUBLIC_CONTACT_EMAIL });
		}
		return { success: true };
	}
};

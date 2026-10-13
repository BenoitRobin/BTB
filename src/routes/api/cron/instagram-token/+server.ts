import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { refreshInstagramToken } from '$lib/server/instagram';
import type { RequestHandler } from './$types';

// Called weekly by Vercel Cron (vercel.json), which sends `Authorization: Bearer $CRON_SECRET`.
export const GET: RequestHandler = async ({ request, fetch }) => {
	if (!env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
		return new Response('Unauthorized', { status: 401 });
	}
	const result = await refreshInstagramToken(fetch);
	return json(result, { status: result.ok ? 200 : 500 });
};

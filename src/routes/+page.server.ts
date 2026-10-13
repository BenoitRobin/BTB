import { getInstagramPosts } from '$lib/server/instagram';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Vercel's CDN serves the page for an hour, so Instagram is called at most once an hour.
	setHeaders({ 'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400' });
	return { instagramPosts: await getInstagramPosts(fetch) };
};

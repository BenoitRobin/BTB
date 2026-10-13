import { error, json } from '@sveltejs/kit';
import { mainEdition, otherEditions } from '$lib/data/editions';
import { getAlbumPhotos } from '$lib/server/lightroom';
import type { RequestHandler } from './$types';

// Loaded on demand when an edition is opened, so the ~450 photo URLs stay out of the page HTML.
export const GET: RequestHandler = async ({ params, fetch, setHeaders }) => {
	const edition = [mainEdition, ...otherEditions].find((e) => e.slug === params.slug);
	if (!edition) error(404, 'Unknown edition');

	const photos = await getAlbumPhotos(fetch, edition.lightroomSpaceId, edition.lightroomAlbumId);
	// Cache a day on Vercel's CDN; don't cache a failure for that long.
	if (photos.length) {
		setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800' });
	}
	return json(photos);
};

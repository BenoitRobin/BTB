import { error, redirect } from '@sveltejs/kit';
import { editions } from '$lib/data/editions';
import { getAlbumPhotos } from '$lib/server/lightroom';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const edition = editions.find((e) => e.slug === params.slug);
	if (!edition) error(404, 'Édition introuvable');

	const photos = await getAlbumPhotos(fetch, edition.lightroomSpaceId, edition.lightroomAlbumId);
	// Lightroom unreachable: send the visitor to the album on Lightroom itself (not cached, so the page recovers on its own).
	if (!photos.length) redirect(307, edition.galleryUrl);

	setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800' });
	return { edition, photos };
};

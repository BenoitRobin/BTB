export type EditionPhoto = {
	id: string;
	thumbUrl: string;
	fullUrl: string;
};

type Asset = {
	id: string;
	links: Record<string, { href: string }>;
};

// Public key used by Lightroom's own web share pages; the rendition files are public too.
const API_KEY = 'LightroomMobileWeb1';

// shortcut: this is the undocumented API behind lightroom.adobe.com share pages, not an official one; if Adobe changes it the gallery falls back to the Lightroom link. Upgrade: import the photos (e.g. to Vercel Blob).
// Never throws: any failure returns [] and the page shows the Lightroom link instead.
export async function getAlbumPhotos(
	fetch: typeof globalThis.fetch,
	spaceId: string,
	albumId: string
): Promise<EditionPhoto[]> {
	const url = `https://photos.adobe.io/v2/spaces/${spaceId}/albums/${albumId}/assets?embed=asset&subtype=image&limit=500`;
	try {
		const res = await fetch(url, { headers: { 'X-API-Key': API_KEY } });
		if (!res.ok) {
			console.error('Lightroom API error', res.status, await res.text());
			return [];
		}
		// Adobe prefixes its JSON with an anti-hijacking guard.
		const text = (await res.text()).replace(/^while\s*\(1\)\s*\{\}\s*/, '');
		const { base, resources }: { base: string; resources: { asset: Asset }[] } = JSON.parse(text);

		return resources.flatMap(({ asset }) => {
			const rendition = (size: string) => asset.links[`/rels/rendition_type/${size}`]?.href;
			const thumb = rendition('640');
			const full = rendition('2048') ?? rendition('1280') ?? thumb;
			if (!thumb || !full) return [];
			const toUrl = (href: string) => `${base}${href}?api_key=${API_KEY}`;
			return [{ id: asset.id, thumbUrl: toUrl(thumb), fullUrl: toUrl(full) }];
		});
	} catch (error) {
		console.error('Lightroom fetch failed', error);
		return [];
	}
}

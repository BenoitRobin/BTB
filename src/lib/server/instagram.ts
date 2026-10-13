import { env } from '$env/dynamic/private';

export type InstagramPost = {
	id: string;
	permalink: string;
	imageUrl: string;
	caption: string;
};

type Media = {
	media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
	media_url?: string;
	thumbnail_url?: string;
};

type MediaItem = Media & {
	id: string;
	caption?: string;
	permalink: string;
	children?: { data: Media[] };
};

type Fetch = typeof globalThis.fetch;

// The home page waits on these calls when its cache expires: never let a stalled Meta or Edge Config hang it.
const TIMEOUT_MS = 3000;

/** A still image for any media: videos only expose one through thumbnail_url. */
function stillOf(media: Media) {
	return media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url;
}

// The long-lived token lasts 60 days; a weekly Vercel cron (see vercel.json) refreshes it and stores it in Edge Config.
// INSTAGRAM_ACCESS_TOKEN is the fallback: local dev, or before the first refresh has written to Edge Config.
const TOKEN_KEY = 'instagramAccessToken';

/** `EDGE_CONFIG` is the connection string Vercel adds when a store is connected: https://edge-config.vercel.com/<id>?token=<read token> */
function edgeConfig() {
	if (!env.EDGE_CONFIG) return null;
	const url = new URL(env.EDGE_CONFIG);
	return { id: url.pathname.slice(1), readToken: url.searchParams.get('token') ?? '' };
}

async function readStoredToken(fetch: Fetch): Promise<string | undefined> {
	const store = edgeConfig();
	if (!store) return undefined;
	const res = await fetch(
		`https://edge-config.vercel.com/${store.id}/item/${TOKEN_KEY}?token=${store.readToken}`,
		{ signal: AbortSignal.timeout(TIMEOUT_MS) }
	);
	// 404 = the key has not been written yet.
	if (!res.ok) return undefined;
	return res.json();
}

async function getAccessToken(fetch: Fetch): Promise<string | undefined> {
	return (await readStoredToken(fetch)) || env.INSTAGRAM_ACCESS_TOKEN || undefined;
}

// Never throws: any failure returns [] so the grid is simply hidden.
export async function getInstagramPosts(fetch: Fetch, limit = 9): Promise<InstagramPost[]> {
	try {
		const token = await getAccessToken(fetch);
		if (!token) return [];

		const url = new URL('https://graph.instagram.com/me/media');
		url.searchParams.set(
			'fields',
			'id,caption,media_type,media_url,thumbnail_url,permalink,children{media_type,media_url,thumbnail_url}'
		);
		url.searchParams.set('limit', String(limit));
		url.searchParams.set('access_token', token);

		const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
		if (!res.ok) {
			console.error('Instagram API error', res.status, await res.text());
			return [];
		}
		const { data }: { data: MediaItem[] } = await res.json();
		return data.flatMap((item) => {
			// A carousel's own media_url is its first item, an .mp4 when that item is a video: use the first item's still.
			const first = item.children?.data[0];
			const imageUrl =
				item.media_type === 'CAROUSEL_ALBUM' && first ? stillOf(first) : stillOf(item);
			if (!imageUrl) return [];
			return [{ id: item.id, permalink: item.permalink, imageUrl, caption: item.caption ?? '' }];
		});
	} catch (error) {
		console.error('Instagram fetch failed', error);
		return [];
	}
}

/**
 * Extends the current token by 60 days and stores the new one in Edge Config.
 * Meta only refreshes a token that is still valid and at least 24 h old, so this must run well before expiry.
 * Never throws and never returns the token itself.
 */
export async function refreshInstagramToken(
	fetch: Fetch
): Promise<{ ok: true; expiresInDays: number } | { ok: false; error: string }> {
	try {
		const store = edgeConfig();
		// Refreshing without somewhere to keep the result would be pointless.
		if (!store || !env.VERCEL_API_TOKEN) {
			return { ok: false, error: 'EDGE_CONFIG or VERCEL_API_TOKEN is not configured' };
		}

		const current = await getAccessToken(fetch);
		if (!current) return { ok: false, error: 'No Instagram token to refresh' };

		const refreshUrl = new URL('https://graph.instagram.com/refresh_access_token');
		refreshUrl.searchParams.set('grant_type', 'ig_refresh_token');
		refreshUrl.searchParams.set('access_token', current);
		const refreshRes = await fetch(refreshUrl);
		if (!refreshRes.ok) {
			const error = `Instagram refresh failed (${refreshRes.status}): ${await refreshRes.text()}`;
			console.error(error);
			return { ok: false, error };
		}
		const { access_token, expires_in }: { access_token: string; expires_in: number } =
			await refreshRes.json();

		const writeUrl = new URL(`https://api.vercel.com/v1/edge-config/${store.id}/items`);
		if (env.VERCEL_TEAM_ID) writeUrl.searchParams.set('teamId', env.VERCEL_TEAM_ID);
		const writeRes = await fetch(writeUrl, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: [{ operation: 'upsert', key: TOKEN_KEY, value: access_token }]
			})
		});
		if (!writeRes.ok) {
			const error = `Edge Config write failed (${writeRes.status}): ${await writeRes.text()}`;
			console.error(error);
			return { ok: false, error };
		}

		return { ok: true, expiresInDays: Math.round(expires_in / 86400) };
	} catch (error) {
		// Network blips or a malformed EDGE_CONFIG: report it in the cron response instead of a bare 500.
		console.error('Instagram token refresh failed', error);
		return { ok: false, error: String(error) };
	}
}

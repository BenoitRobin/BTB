import placeholder2026 from '$lib/assets/placeholder/placeholder2026.jpg';
import placeholder2025 from '$lib/assets/placeholder/placeholder2025.jpg';
import placeholder2024 from '$lib/assets/placeholder/placeholder2024.jpg';

export type Edition = {
	slug: string;
	title: string;
	year: string;
	/** Cover shown on the edition's polaroid. */
	image: string;
	/** Public Lightroom album, opened as a fallback when the photos cannot be loaded in the page. */
	galleryUrl: string;
	/** From the share page `lightroom.adobe.com/shares/<spaceId>` behind `galleryUrl`. */
	lightroomSpaceId: string;
	lightroomAlbumId: string;
};

/** Every past edition, most recent first. */
export const editions: Edition[] = [
	{
		slug: 'edition-2026',
		title: 'BTB#8',
		year: '2026',
		image: placeholder2026,
		galleryUrl: 'https://adobe.ly/4e7JcUc',
		lightroomSpaceId: '8bab901cb9624842b55516c1895571f3',
		lightroomAlbumId: 'efaaabaf9f8b4452b7a6d05596000942'
	},
	{
		slug: 'edition-2025',
		title: 'BTB#7',
		year: '2025',
		image: placeholder2025,
		galleryUrl: 'https://adobe.ly/4dZQnMd',
		lightroomSpaceId: 'a375c9b0c65e417fbbd45414c43ddde4',
		lightroomAlbumId: 'fd297bf22486484f8130a10ecefc7ea0'
	},
	{
		slug: 'edition-2024',
		title: 'BTB#6',
		year: '2024',
		image: placeholder2024,
		galleryUrl: 'https://adobe.ly/3xh4SKN',
		lightroomSpaceId: '1184aed558064ee193c6efe92cd041c3',
		lightroomAlbumId: '269aa83af34b471f9b67d1038ecf0ec7'
	}
];

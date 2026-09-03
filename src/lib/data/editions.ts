export type Edition = {
	slug: string;
	title: string;
	year: string;
	galleryUrl: string;
};

export const mainEdition: Edition = {
	slug: 'edition-2026',
	title: 'BTB#8',
	year: '2026',
	galleryUrl: 'https://adobe.ly/4e7JcUc'
};

export const otherEditions: Edition[] = [
	{ slug: 'edition-2025', title: 'BTB#7', year: '2025', galleryUrl: 'https://adobe.ly/4dZQnMd' },
	{ slug: 'edition-2024', title: 'BTB#6', year: '2024', galleryUrl: 'https://adobe.ly/3xh4SKN' }
];

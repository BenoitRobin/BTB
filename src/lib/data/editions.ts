export type Edition = {
	slug: string;
	title: string;
	year: string;
};

export const mainEdition: Edition = {
	slug: 'edition-2024',
	title: "L'édition 2024",
	year: '2024'
};

export const otherEditions: Edition[] = [
	{ slug: 'edition-2023', title: "L'édition 2023", year: '2023' },
	{ slug: 'edition-2022', title: "L'édition 2022", year: '2022' }
];

import creditAgricole from '$lib/assets/partners/credit-agricole.png';
import sarlJeanClaudeLaurent from '$lib/assets/partners/sarl-jean-claude-laurent.png';
import mairieDeChantelle from '$lib/assets/partners/mairie-de-chantelle.png';
import groupama from '$lib/assets/partners/groupama.png';
import laTaverneChantelle from '$lib/assets/partners/la-taverne-chantelle.png';
import boulangerieLaurentJeremy from '$lib/assets/partners/boulangerie-laurent-jeremy.png';
import ccSaintPourcainSiouleLimagne from '$lib/assets/partners/cc-saint-pourcain-sioule-limagne.png';

export type Partner = {
	name: string;
	logo: string;
	url: string;
};

export const partners: Partner[] = [
	{
		name: 'Crédit Agricole Centre France',
		logo: creditAgricole,
		url: 'https://www.facebook.com/Credit.Agricole.Centre.France'
	},
	{
		name: 'SARL Jean-Claude Laurent',
		logo: sarlJeanClaudeLaurent,
		url: 'https://www.facebook.com/sarllaurentjean.claude03140chantelle'
	},
	{
		name: 'Mairie de Chantelle',
		logo: mairieDeChantelle,
		url: 'https://www.facebook.com/profile.php?id=61570971480397'
	},
	{
		name: 'Groupama',
		logo: groupama,
		url: 'https://www.facebook.com/groupama'
	},
	{
		name: 'La Taverne Chantelle',
		logo: laTaverneChantelle,
		url: 'https://www.facebook.com/profile.php?id=100063701583917'
	},
	{
		name: 'Boulangerie Pâtisserie Laurent Jeremy',
		logo: boulangerieLaurentJeremy,
		url: 'https://www.facebook.com/bpl03140'
	},
	{
		name: 'Communauté de communes Saint-Pourçain Sioule Limagne',
		logo: ccSaintPourcainSiouleLimagne,
		url: 'https://www.facebook.com/ComComSPSL'
	}
];

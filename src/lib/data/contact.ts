/** Choices offered in the contact form; the server only accepts these. */
export const CONTACT_TYPES = ['Fanfaron', 'Bénévole'] as const;

/** Shown to the visitor only when sending fails, so they still have a way to reach us. */
export const PUBLIC_CONTACT_EMAIL = 'contact@bougetonbouble.fr';

/** `?type=` value used by links that pre-select a choice, e.g. "Bénévole" → "benevole". */
export function contactTypeSlug(type: string) {
	return type
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();
}

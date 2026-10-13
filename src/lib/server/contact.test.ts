import { describe, expect, it } from 'vitest';
import { isSpam, validateContact } from './contact';
import { CONTACT_TYPES, contactTypeSlug } from '$lib/data/contact';

function form(fields: Record<string, string>) {
	const data = new FormData();
	for (const [key, value] of Object.entries(fields)) data.set(key, value);
	return data;
}

const valid = {
	type: 'Bénévole',
	name: 'Camille',
	email: 'camille@example.com',
	message: 'Je peux tenir la buvette tout le samedi.'
};

describe('validateContact', () => {
	it('accepts a complete message', () => {
		expect(validateContact(form(valid)).errors).toEqual({});
	});

	it('flags every empty field', () => {
		const { errors } = validateContact(form({}));
		expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'type']);
	});

	it('rejects an invalid email', () => {
		expect(validateContact(form({ ...valid, email: 'pas-un-mail' })).errors).toHaveProperty(
			'email'
		);
	});

	it('rejects a type that is not offered', () => {
		expect(validateContact(form({ ...valid, type: 'Autre' })).errors).toHaveProperty('type');
	});

	it('enforces the message length bounds', () => {
		expect(validateContact(form({ ...valid, message: 'Salut' })).errors).toHaveProperty('message');
		expect(validateContact(form({ ...valid, message: 'a'.repeat(5001) })).errors).toHaveProperty(
			'message'
		);
	});

	it('counts a line break as one character, like the textarea maxlength', () => {
		const message = 'a'.repeat(4980) + '\r\n'.repeat(10);
		const { values, errors } = validateContact(form({ ...valid, message: message + 'fin' }));
		expect(values.message).not.toContain('\r');
		expect(errors).toEqual({});
	});

	it('trims surrounding spaces', () => {
		const { values, errors } = validateContact(form({ ...valid, name: '  Camille  ' }));
		expect(values.name).toBe('Camille');
		expect(errors).toEqual({});
	});
});

describe('isSpam', () => {
	it('is true only when the honeypot is filled', () => {
		expect(isSpam(form(valid))).toBe(false);
		expect(isSpam(form({ ...valid, website: 'http://spam.example' }))).toBe(true);
	});
});

describe('contactTypeSlug', () => {
	it('gives the accent-free ?type= values used by the hero links', () => {
		expect(CONTACT_TYPES.map(contactTypeSlug)).toEqual(['fanfaron', 'benevole']);
	});
});

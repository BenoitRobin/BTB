import { contactAction } from '$lib/server/contact';
import type { Actions } from './$types';

export const actions: Actions = { contact: contactAction };

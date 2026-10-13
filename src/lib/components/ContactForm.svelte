<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import type { ActionData } from '../../routes/$types';

	let { form }: { form: ActionData } = $props();

	// Same list as CONTACT_TYPES in $lib/server/contact.ts, which the server validates against.
	const types = ['Fanfare', 'Bénévole', 'Autre'];

	let sending = $state(false);
	const values = $derived(form && 'values' in form ? form.values : undefined);
	const errors = $derived(form && 'errors' in form ? form.errors : undefined);

	const field = 'border-0 border-b-2 border-ink bg-transparent px-0.5 py-1.5 outline-none';
	const errorText = 'text-lg text-red-700';
</script>

<section class="mx-auto mt-20 flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 md:flex-row">
	<div class="min-w-0 md:flex-1">
		<SectionHeading id="contact" title="Fanfare ou bénévole, écris-nous !" />
		<p class="mt-6 max-w-[40ch]">
			Tu fais partie d'une fanfare et tu veux postuler pour la prochaine édition ? Ou tu veux donner
			un coup de main et devenir bénévole pendant tout un week-end ? Laisse-nous un message et on
			revient vers toi rapidement.
		</p>
	</div>

	<div class="min-w-0 sketch-alt bg-white p-7 md:flex-1">
		{#if form?.success}
			<p class="text-2xl" role="status">Merci, on te répond aussi vite qu'un fanfaron le peut !</p>
		{:else}
			<form
				method="POST"
				action="?/contact"
				use:enhance={() => {
					sending = true;
					return async ({ update }) => {
						// Keep what the visitor typed if the server sends errors back.
						await update({ reset: false });
						sending = false;
					};
				}}
				class="flex flex-col gap-5"
			>
				<fieldset class="flex flex-col gap-2">
					<legend class="mb-2">Tu es…</legend>
					<div class="flex flex-wrap gap-3">
						{#each types as type, i (type)}
							<label
								class={[
									'cursor-pointer bg-white px-4 py-1 transition-colors has-checked:bg-sky has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-sky-ink has-focus-visible:outline-dashed',
									i % 2 ? 'sketch-alt' : 'sketch'
								]}
							>
								<input
									type="radio"
									name="type"
									value={type}
									required
									checked={values?.type === type}
									class="sr-only"
								/>
								{type}
							</label>
						{/each}
					</div>
					{#if errors?.type}<p class={errorText}>{errors.type}</p>{/if}
				</fieldset>

				<label class="flex flex-col gap-1">
					Qui es-tu donc ?
					<input
						type="text"
						name="name"
						required
						maxlength="100"
						autocomplete="name"
						value={values?.name ?? ''}
						aria-invalid={errors?.name ? true : undefined}
						class={field}
					/>
					{#if errors?.name}<span class={errorText}>{errors.name}</span>{/if}
				</label>

				<label class="flex flex-col gap-1">
					Ton adresse électronique
					<input
						type="email"
						name="email"
						required
						autocomplete="email"
						value={values?.email ?? ''}
						aria-invalid={errors?.email ? true : undefined}
						class={field}
					/>
					{#if errors?.email}<span class={errorText}>{errors.email}</span>{/if}
				</label>

				<label class="flex flex-col gap-1">
					Donne-nous envie de t'inviter…
					<textarea
						name="message"
						required
						minlength="10"
						maxlength="5000"
						rows="4"
						aria-invalid={errors?.message ? true : undefined}
						class="sketch-alt bg-transparent p-2 outline-none">{values?.message ?? ''}</textarea
					>
					{#if errors?.message}<span class={errorText}>{errors.message}</span>{/if}
				</label>

				<!-- Honeypot: hidden from people, bots fill it in and get silently dropped. -->
				<div class="hidden" aria-hidden="true">
					<label>
						Ne pas remplir
						<input type="text" name="website" tabindex="-1" autocomplete="off" />
					</label>
				</div>

				{#if form && 'sendFailed' in form}
					<p class={errorText} role="alert">
						Oups, le pigeon s'est perdu… Réessaie dans un instant ou écris-nous directement à
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link, not an app route -->
						<a href="mailto:{form.fallbackEmail}" class="underline">{form.fallbackEmail}</a>.
					</p>
				{/if}

				<div>
					<Button type="submit">
						{sending ? 'Envoi en cours…' : 'Va petit oiseau, porte ce message'}
					</Button>
				</div>
			</form>
		{/if}
	</div>
</section>

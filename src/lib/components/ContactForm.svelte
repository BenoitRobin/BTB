<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import type { ActionData } from '../../routes/$types';
	import { CONTACT_TYPES, PUBLIC_CONTACT_EMAIL, contactTypeSlug } from '$lib/data/contact';

	let { form }: { form: ActionData } = $props();

	let sending = $state(false);
	// Set when the request itself fails (network down, server crash), where no `form` result comes back.
	let requestFailed = $state(false);
	const values = $derived(form && 'values' in form ? form.values : undefined);
	const errors = $derived(form && 'errors' in form ? form.errors : undefined);

	// Links like /?type=benevole#contact (hero buttons) pre-select a choice.
	const typeFromUrl = $derived(
		CONTACT_TYPES.find((t) => contactTypeSlug(t) === page.url.searchParams.get('type')) ?? ''
	);
	// Drives the ticked choice and the message prompt; a failed submit's value wins, then the link's.
	let selectedType = $derived(values?.type ?? typeFromUrl);

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

	<!-- After a successful send the box hugs the thank-you message instead of stretching to the text column. -->
	<div class={['min-w-0 sketch-alt bg-white p-7 md:flex-1', form?.success && 'md:self-center']}>
		{#if form?.success}
			<p class="text-2xl" role="status">Merci, on te répond aussi vite qu'un fanfaron le peut !</p>
		{:else}
			<form
				method="POST"
				action="?/contact#contact"
				use:enhance={({ cancel }) => {
					// Ignore extra clicks while a message is already on its way, so it is sent once.
					if (sending) return cancel();
					sending = true;
					requestFailed = false;
					return async ({ result, update }) => {
						// A failed request would replace the page with an error screen and lose the message: keep the form instead.
						if (result.type === 'error') requestFailed = true;
						// Keep what the visitor typed if the server sends errors back.
						else await update({ reset: false });
						sending = false;
					};
				}}
				class="flex flex-col gap-5"
			>
				<fieldset class="flex flex-col gap-2">
					<legend class="mb-2">Tu es…</legend>
					<div class="flex flex-wrap gap-3">
						{#each CONTACT_TYPES as type, i (type)}
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
									checked={selectedType === type}
									onchange={() => (selectedType = type)}
									class="sr-only"
								/>
								{type}
							</label>
						{/each}
					</div>
					{#if errors?.type}<p class={errorText}>{errors.type}</p>{/if}
				</fieldset>

				<label class="flex flex-col gap-1">
					C'est quoi ton p'tit nom ?
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
					{selectedType === 'Bénévole' ? 'Parle-nous de toi…' : 'Donne-nous envie de vous choisir…'}
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

				<!-- Honeypot: hidden from people (display: none), bots fill it in and get silently dropped. -->
				<label class="hidden">
					Ne pas remplir
					<input type="text" name="website" tabindex="-1" autocomplete="off" />
				</label>

				{#if requestFailed || (form && 'sendFailed' in form)}
					<p class={errorText} role="alert">
						Oups, le pigeon s'est perdu… Réessaie dans un instant ou écris-nous directement à
						<a href="mailto:{PUBLIC_CONTACT_EMAIL}" class="underline">{PUBLIC_CONTACT_EMAIL}</a>.
					</p>
				{/if}

				<div class="flex justify-center">
					<Button type="submit">
						<span class="flex items-center gap-3">
							{sending ? 'Envoi en cours…' : 'Va petit oiseau, porte ce message'}
							<svg
								viewBox="0 0 48 32"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
								class={['bird h-9 w-auto shrink-0 translate-y-1.5', sending && 'bird--away']}
							>
								<path d="M2 14.5h9M3 18h8.5" />
								<path
									d="M11 13c5 .5 9-.5 12-3 3-3 7-4.5 10.5-3.5 2.5.8 4 2.6 4.5 4.6l4.5 1.4-4.6 1c-1.2 4.4-6 7-11.4 6.8-6-.2-10.5-2-15.5-3.3"
								/>
								<circle cx="35" cy="10.5" r="1" fill="currentColor" stroke="none" />
								<path
									class="wing"
									d="M18 14c1.5 4 3 8 5.5 12M21 14.5c1.4 3.6 2.6 7.4 4.8 10.6M24 15c1.2 3 2.2 6.2 4 8.8M27 15.2c1 2.4 1.8 4.8 3.2 6.8"
								/>
							</svg>
						</span>
					</Button>
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	/* The wing flips up over the body from its root line, like a flap. */
	.wing {
		transform-box: view-box;
		transform-origin: 22px 14.5px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.bird {
			--bob-to: translateY(-3px);
			animation: bob 1.4s ease-in-out infinite;
		}
		.wing {
			animation: wing-flap 0.3s ease-in-out infinite alternate;
		}
		/* While the message is being sent, the bird takes off. */
		.bird--away {
			animation: bird-away 0.9s ease-in infinite;
		}
	}

	@keyframes wing-flap {
		from {
			transform: scaleY(1);
		}
		to {
			transform: scaleY(-0.6);
		}
	}

	@keyframes bird-away {
		from {
			transform: translate(0, 0);
			opacity: 1;
		}
		to {
			transform: translate(28px, -12px);
			opacity: 0;
		}
	}
</style>

<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const subject = `Message de ${name || 'un visiteur du site'} — Bouge Ton Bouble`;
		const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`;
		const mailLink = document.createElement('a');
		mailLink.href = `mailto:contact@bougetonbouble.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		mailLink.click();

		submitted = true;
	}

	const field = 'border-0 border-b-2 border-ink bg-transparent px-0.5 py-1.5 outline-none';
</script>

<section class="mx-auto mt-20 flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 md:flex-row">
	<div class="min-w-0 md:flex-1">
		<SectionHeading id="contact-form" title="Fanfare ou bénévole, écris-nous !" />
		<p class="mt-6 max-w-[40ch]">
			Tu fais partie d'une fanfare et tu veux postuler pour la prochaine édition ? Ou tu veux donner
			un coup de main et devenir bénévole pendant tout un week-end ? Laisse-nous un message et on
			revient vers toi rapidement.
		</p>
	</div>

	<div class="min-w-0 sketch-alt bg-white p-7 md:flex-1">
		{#if submitted}
			<p class="text-2xl">Merci, on te répond aussi vite qu'un fanfaron le peut !</p>
		{:else}
			<form onsubmit={handleSubmit} class="flex flex-col gap-5">
				<label class="flex flex-col gap-1">
					Qui es-tu donc ?
					<input type="text" bind:value={name} autocomplete="name" class={field} />
				</label>
				<label class="flex flex-col gap-1">
					Ton adresse électronique
					<input type="email" bind:value={email} autocomplete="email" class={field} />
				</label>
				<label class="flex flex-col gap-1">
					Donne-nous envie de t'inviter…
					<textarea bind:value={message} rows="4" class="sketch-alt bg-transparent p-2 outline-none"
					></textarea>
				</label>
				<div>
					<Button type="submit">Va petit oiseau, porte ce message</Button>
				</div>
			</form>
		{/if}
	</div>
</section>

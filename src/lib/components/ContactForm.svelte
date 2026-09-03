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
		window.location.href = `mailto:contact@bougetonbouble.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		submitted = true;
	}
</script>

<section class="mt-16 pb-24">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="contact-form" title="Envoie nous un message" />
	</div>

	<div
		class="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:justify-between"
	>
		<form onsubmit={handleSubmit} class="flex w-full flex-col items-start md:w-[45%]">
			<input
				type="text"
				bind:value={name}
				placeholder="qui es-tu donc ?"
				class="mb-6 h-12 w-full rounded-lg bg-black/[0.035] px-3 text-lg outline-none placeholder:font-normal"
			/>
			<input
				type="email"
				bind:value={email}
				placeholder="Ton adresse électronique"
				class="mb-6 h-12 w-full rounded-lg bg-black/[0.035] px-3 text-lg outline-none placeholder:font-normal"
			/>
			<textarea
				bind:value={message}
				placeholder="Donne nous envie de t'inviter..."
				class="mb-10 h-32 w-full rounded-lg bg-black/[0.035] px-3 py-2 text-lg outline-none placeholder:font-normal"
			></textarea>
			<Button type="submit">Va petit oiseau, porte ce message</Button>
			{#if submitted}
				<p class="mt-4 text-[#5e5e5e]">Merci, on te répond vite !</p>
			{/if}
		</form>

		<div class="w-full md:w-[39%]">
			<h3 class="mb-2 text-2xl font-bold">Fanfare ou bénévole, écris-nous !</h3>
			<p>
				Tu fais partie d'une fanfare et tu veux postuler pour la prochaine édition ? Ou tu es plutôt
				du genre à donner un coup de main et tu veux devenir bénévole pour participer à cette fête
				pendant tout un week-end ? Dans tous les cas, on a hâte de te lire ! Laisse-nous un message
				et on revient vers toi rapidement pour la suite.
			</p>
		</div>
	</div>
</section>

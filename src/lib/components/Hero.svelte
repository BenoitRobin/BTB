<script lang="ts">
	import Button from './Button.svelte';
	import bobImg from '$lib/assets/bob.png';
</script>

<section
	class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-10 pb-16 md:flex-row md:items-center"
>
	<div class="flex min-w-0 flex-col items-start gap-6 md:flex-[3]">
		<p class="-rotate-2 text-2xl">Hello, je m'appelle Robert ↓</p>
		<h1 class="text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
			J'organise un p'tit <span class="highlight">raoût musical</span> avec mes amis.
		</h1>
		<p class="max-w-[34ch] text-2xl">
			Des fanfares plein les rues de Chantelle, dans l'Allier. Viendez nous retrouver !
		</p>
		<div class="flex flex-wrap gap-4">
			<Button href="/#contact-form" variant="pink">Ta fanfare veut venir ?</Button>
			<Button href="/#contact-form" variant="paper">Devenir bénévole</Button>
		</div>
	</div>

	<figure class="relative mx-auto w-full max-w-sm p-4 md:flex-[2]">
		<div
			class="absolute top-1 left-[38%] z-10 h-7 w-28 -rotate-3 bg-pink/55"
			aria-hidden="true"
		></div>
		<img
			src={bobImg}
			alt="Bob, la mascotte du festival, de dos face au village de Chantelle"
			class="block h-auto w-full rotate-2 border-2 border-ink bg-white p-2.5"
		/>
		<figcaption class="absolute -right-1 -bottom-6 -rotate-3 text-xl">
			↖ Bob, notre mascotte
		</figcaption>
	</figure>
</section>

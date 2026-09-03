<script lang="ts">
	import Button from './Button.svelte';

	let menuOpen = $state(false);
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white">
	<nav class="mx-auto w-full max-w-6xl px-6 py-5">
		<div class="flex items-center justify-between">
			<a href="/" class="text-3xl font-bold">BTB</a>
			<div class="hidden items-center gap-8 sm:flex md:gap-12">
				<a href="/#about-me" class="hover:underline">C'est quoi ?</a>
				<a href="/#my-work" class="hover:underline">BTB#?</a>
				<a href="/#skills" class="hover:underline">Partenaires</a>
				<Button href="/#contact-form" size="nav">Contact</Button>
			</div>
			<button
				type="button"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
			>
				<span
					class="h-0.5 w-6 bg-black transition-transform {menuOpen
						? 'translate-y-2 rotate-45'
						: ''}"
				></span>
				<span class="h-0.5 w-6 bg-black transition-opacity {menuOpen ? 'opacity-0' : ''}"></span>
				<span
					class="h-0.5 w-6 bg-black transition-transform {menuOpen
						? '-translate-y-2 -rotate-45'
						: ''}"
				></span>
			</button>
		</div>

		{#if menuOpen}
			<div class="mt-5 flex flex-col items-start gap-5 pb-5 sm:hidden">
				<a href="/#about-me" class="hover:underline" onclick={() => (menuOpen = false)}
					>C'est quoi ?</a
				>
				<a href="/#my-work" class="hover:underline" onclick={() => (menuOpen = false)}>BTB#?</a>
				<a href="/#skills" class="hover:underline" onclick={() => (menuOpen = false)}>Partenaires</a
				>
				<Button href="/#contact-form" size="nav">Contact</Button>
			</div>
		{/if}
	</nav>
</header>

<div class="mx-auto w-full max-w-6xl px-6 py-5" aria-hidden="true" inert>
	<div class="flex items-center justify-between opacity-0">
		<span class="text-3xl font-bold">BTB</span>
		<span class="hidden items-center gap-8 sm:flex md:gap-12">
			<span>C'est quoi ?</span>
			<Button href="/#contact-form" size="nav">Contact</Button>
		</span>
		<span class="block h-10 w-10 sm:hidden"></span>
	</div>
</div>

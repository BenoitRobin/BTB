<script lang="ts">
	import Button from './Button.svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '/#about-me', label: "C'est quoi ?" },
		{ href: '/#my-work', label: 'Les éditions' },
		{ href: '/#skills', label: 'Partenaires' }
	];
</script>

<header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
	<nav class="mx-auto w-full max-w-6xl sketch bg-white px-6 py-3">
		<div class="flex items-center justify-between">
			<a href="/" class="font-display text-2xl leading-none lg:text-4xl">Bouge Ton Bouble</a>
			<div class="hidden items-center gap-8 sm:flex md:gap-10">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="border-b-2 border-dashed border-ink hover:border-solid hover:highlight"
						>{link.label}</a
					>
				{/each}
				<Button href="/#contact-form" size="nav">Contact</Button>
			</div>
			<button
				type="button"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				class="flex h-11 w-11 flex-col items-center justify-center gap-1.5 sm:hidden"
			>
				<span
					class="h-0.5 w-6 bg-ink transition-transform {menuOpen ? 'translate-y-2 rotate-45' : ''}"
				></span>
				<span class="h-0.5 w-6 bg-ink transition-opacity {menuOpen ? 'opacity-0' : ''}"></span>
				<span
					class="h-0.5 w-6 bg-ink transition-transform {menuOpen
						? '-translate-y-2 -rotate-45'
						: ''}"
				></span>
			</button>
		</div>

		{#if menuOpen}
			<div class="mt-4 flex flex-col items-start gap-4 pb-3 sm:hidden">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="border-b-2 border-dashed border-ink"
						onclick={() => (menuOpen = false)}>{link.label}</a
					>
				{/each}
				<Button href="/#contact-form" size="nav">Contact</Button>
			</div>
		{/if}
	</nav>
</header>

<div class="h-24" aria-hidden="true"></div>

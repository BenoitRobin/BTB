<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Button from './Button.svelte';
	import { burst } from './BingoBurst.svelte';

	let menuOpen = $state(false);

	const links = [
		{ id: 'c-est-quoi', label: "C'est quoi ?" },
		{ id: 'editions', label: "C'était comment ?" },
		{ id: 'partenaires', label: 'Partenaires' }
	];
</script>

<!-- The bingo page's link: its word pops inside a comic burst (like a won bingo) on hover, focus and on that page. -->
{#snippet bonusLink(onclick?: () => void, extraClass = '')}
	<a
		href={resolve('/bingo')}
		aria-current={page.url.pathname === '/bingo' ? 'page' : undefined}
		{onclick}
		class="bonus relative sketch-link {extraClass}"
	>
		<svg viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true" class="bonus-burst">
			<polygon
				points={burst}
				fill="var(--color-pink)"
				stroke="var(--color-ink)"
				stroke-width="2"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
			/>
		</svg>
		<span class="relative">Bonus</span>
	</a>
{/snippet}

<header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
	<nav class="mx-auto w-full max-w-6xl sketch bg-white px-6 py-3">
		<div class="flex items-center justify-between">
			<a href={resolve('/')} class="font-display text-2xl leading-none lg:text-4xl"
				>Bouge Ton Bouble</a
			>
			<div class="hidden items-center gap-8 whitespace-nowrap lg:flex xl:gap-10">
				{#each links as link (link.id)}
					<a href="{resolve('/')}#{link.id}" class="sketch-link hover:highlight">{link.label}</a>
				{/each}
				{@render bonusLink()}
				<Button href="/#contact" size="nav">Contact</Button>
			</div>
			<button
				type="button"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				class="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
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
			<div class="mt-4 flex flex-col items-start gap-4 pb-3 lg:hidden">
				{#each links as link (link.id)}
					<a href="{resolve('/')}#{link.id}" class="sketch-link" onclick={() => (menuOpen = false)}
						>{link.label}</a
					>
				{/each}
				<!-- Room for the burst in the stacked menu. -->
				{@render bonusLink(() => (menuOpen = false), 'my-3')}
				<Button href="/#contact" size="nav">Contact</Button>
			</div>
		{/if}
	</nav>
</header>

<div class="h-24" aria-hidden="true"></div>

<style>
	/* Stretched wider than tall so the burst hugs the word without overflowing the bar. */
	.bonus-burst {
		position: absolute;
		top: -65%;
		left: -55%;
		width: 210%;
		height: 230%;
		opacity: 0;
		transform: scale(0.3) rotate(-25deg);
	}

	.bonus:focus-visible .bonus-burst,
	.bonus[aria-current] .bonus-burst {
		opacity: 1;
		transform: none;
	}
	.bonus:focus-visible,
	.bonus[aria-current] {
		border-bottom-color: transparent;
	}

	/* Real hover only: on touch screens :hover sticks after a tap. */
	@media (hover: hover) {
		.bonus:hover .bonus-burst {
			opacity: 1;
			transform: none;
		}
		.bonus:hover {
			border-bottom-color: transparent;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.bonus-burst {
			transition:
				transform 300ms cubic-bezier(0.3, 1.6, 0.5, 1),
				opacity 150ms;
		}
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		type = 'button',
		size = 'default',
		variant = 'sky',
		external = false,
		onclick,
		children
	}: {
		href?: string;
		external?: boolean;
		type?: 'button' | 'submit';
		size?: 'default' | 'nav';
		variant?: 'sky' | 'pink' | 'paper';
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const base =
		'wiggle sketch inline-flex items-center justify-center text-ink shadow-sketch transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none';
	const sizes = {
		default: 'px-7 py-3 text-2xl',
		nav: 'px-5 py-1.5 text-xl'
	};
	const variants = {
		sky: 'bg-sky',
		pink: 'bg-pink',
		paper: 'bg-white'
	};
</script>

{#if href}
	<!-- eslint-disable svelte/no-navigation-without-resolve -- callers pass in-page anchors (/#section) or external URLs -->
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noreferrer' : undefined}
		class="{base} {sizes[size]} {variants[variant]}"
	>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
		{@render children()}
	</a>
{:else}
	<button {type} {onclick} class="{base} {sizes[size]} {variants[variant]}">
		{@render children()}
	</button>
{/if}

<style>
	/* `transform` rotate, so it stacks with the Tailwind `translate` hover lift.
	   Real hover only: on touch screens :hover sticks after a tap. */
	@media (prefers-reduced-motion: no-preference) and (hover: hover) {
		.wiggle:hover {
			animation: wiggle 1s ease-in-out;
		}
	}

	@keyframes wiggle {
		0%,
		100% {
			transform: rotate(0);
		}
		15% {
			transform: rotate(-2deg);
		}
		30% {
			transform: rotate(1.5deg);
		}
		45% {
			transform: rotate(-1deg);
		}
		60% {
			transform: rotate(0.6deg);
		}
		75% {
			transform: rotate(-0.25deg);
		}
	}
</style>

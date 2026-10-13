<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		type = 'button',
		size = 'default',
		variant = 'sky',
		onclick,
		children
	}: {
		href?: string;
		type?: 'button' | 'submit';
		size?: 'default' | 'nav';
		variant?: 'sky' | 'pink' | 'paper';
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const base =
		'sketch inline-flex items-center justify-center text-ink shadow-sketch transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none';
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
	<a {href} class="{base} {sizes[size]} {variants[variant]}">
		{@render children()}
	</a>
{:else}
	<button {type} {onclick} class="{base} {sizes[size]} {variants[variant]}">
		{@render children()}
	</button>
{/if}

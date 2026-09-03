<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		type = 'button',
		size = 'default',
		onclick,
		children
	}: {
		href?: string;
		type?: 'button' | 'submit';
		size?: 'default' | 'nav';
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const base =
		'inline-flex items-center justify-center rounded-[10px] border border-black bg-black font-medium text-white transition-colors hover:bg-white hover:text-black';
	const sizes = {
		default: 'px-10 py-3.5 text-xl md:text-2xl',
		nav: 'px-6 py-2.5 text-lg'
	};
</script>

{#if href}
	<a {href} class="{base} {sizes[size]}">
		{@render children()}
	</a>
{:else}
	<button {type} {onclick} class="{base} {sizes[size]}">
		{@render children()}
	</button>
{/if}

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

{#if scrollY > 400}
	<div
		class="fixed right-8 bottom-8 z-40 sm:right-12 sm:bottom-12"
		transition:fade={{ duration: 200 }}
	>
		<!-- No behavior passed: the global scroll-behavior (smooth unless reduced motion) applies. -->
		<Button variant="paper" onclick={() => window.scrollTo({ top: 0 })}>
			<span aria-hidden="true">↑</span>
			<span class="sr-only">Revenir en haut de la page</span>
		</Button>
	</div>
{/if}

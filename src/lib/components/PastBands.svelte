<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { pastBands } from '$lib/data/pastBands';

	const badgeColors = [
		'var(--color-sky)',
		'var(--color-pink)',
		'var(--color-grass)',
		'var(--color-earth)'
	];
	const tilts = ['-rotate-[1.5deg]', 'rotate-1', 'rotate-0', '-rotate-1', 'rotate-2', 'rotate-0'];

	// New random colour on every hover, never the same one twice in a row on a badge.
	function pickColor(event: Event) {
		const badge = event.currentTarget as HTMLElement;
		const current = badge.style.getPropertyValue('--badge-color');
		const choices = badgeColors.filter((color) => color !== current);
		badge.style.setProperty('--badge-color', choices[Math.floor(Math.random() * choices.length)]);
	}
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="fanfares" title="Ils sont venus !" />

	<ul class="mt-8 flex flex-wrap gap-x-4 gap-y-3.5">
		{#each pastBands as band, i (band.name)}
			<li>
				<a
					href={band.url}
					target="_blank"
					rel="external noreferrer"
					onmouseenter={pickColor}
					class="badge block bg-white px-5 py-2 text-[1.45rem] transition-colors {i % 2
						? 'sketch-alt'
						: 'sketch'} {tilts[i % tilts.length]}"
				>
					{band.name}
				</a>
			</li>
		{/each}
		<li class="self-end px-1 font-display text-4xl leading-none">
			<span aria-hidden="true">…</span><span class="sr-only">et bien d'autres</span>
		</li>
	</ul>
</section>

<style>
	.badge:hover {
		background-color: var(--badge-color, var(--color-sky));
	}
</style>

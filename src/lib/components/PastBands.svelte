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
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="past-bands" title="Ils sont venus !" />

	<ul class="mt-8 flex flex-wrap gap-x-4 gap-y-3.5">
		{#each pastBands as band, i (band.name)}
			<li>
				<a
					href={band.url}
					target="_blank"
					rel="noreferrer"
					style="--badge-color: {badgeColors[i % badgeColors.length]}"
					class="badge block bg-white px-5 py-2 text-[1.45rem] transition-colors {i % 2
						? 'sketch-alt'
						: 'sketch'} {tilts[i % tilts.length]}"
				>
					{band.name}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.badge:hover {
		background-color: var(--badge-color);
	}
</style>

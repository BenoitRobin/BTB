<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { pastBands } from '$lib/data/pastBands';

	const badgeColors = ['#2babe2', '#ec7e89', '#1ca438', '#af7f49'];
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="past-bands" title="Ils sont venus !" />
	</div>

	<div class="mx-auto mt-8 mb-16 w-full max-w-6xl px-6">
		<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each pastBands as band, i (band.name)}
				<li class="h-full">
					<a
						href={band.url}
						target="_blank"
						rel="noreferrer"
						style="--badge-color: {badgeColors[i % badgeColors.length]}"
						class="badge flex h-full min-h-[92px] items-center justify-center rounded-2xl border-[3px] border-black px-6 py-5 text-center text-lg tracking-wide uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5"
					>
						{band.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.badge {
		background-color: var(--badge-color);
		color: white;
		font-family: 'Baloo 2', sans-serif;
		font-weight: 800;
	}

	.badge:hover {
		background-color: white;
		color: var(--badge-color);
	}
</style>

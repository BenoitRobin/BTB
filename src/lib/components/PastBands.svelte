<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { pastBands } from '$lib/data/pastBands';

	const badgeColors = ['#3ab0e0', '#f2555f', '#f5b642', '#4cb87a', '#a06bd6', '#ec6fae'];
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="past-bands" title="Ils sont venus !" />
	</div>

	<div class="mx-auto mt-8 mb-16 w-full max-w-6xl px-6">
		<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each pastBands as band, i (band.name)}
				<li>
					<a
						href={band.url}
						target="_blank"
						rel="noreferrer"
						style="background-color: {badgeColors[i % badgeColors.length]}"
						class="block rounded-2xl border-[3px] border-black px-6 py-5 text-center text-lg font-extrabold tracking-wide text-white uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
					>
						{band.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

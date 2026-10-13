<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { mainEdition, otherEditions } from '$lib/data/editions';
	import placeholder2026 from '$lib/assets/placeholder/placeholder2026.png';
	import placeholder2025 from '$lib/assets/placeholder/placeholder2025.png';
	import placeholder2024 from '$lib/assets/placeholder/placeholder2024.png';

	const editions = [
		{ ...mainEdition, image: placeholder2026 },
		...otherEditions.map((edition, i) => ({
			...edition,
			image: [placeholder2025, placeholder2024][i]
		}))
	];
	const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'];
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="my-work" title="Comment c'était avant ?" />

	<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each editions as edition, i (edition.slug)}
			<a
				href={edition.galleryUrl}
				target="_blank"
				rel="noreferrer"
				class="group block border-2 border-ink bg-white p-3 pb-2 shadow-sketch transition-transform hover:rotate-0 {tilts[
					i % tilts.length
				]}"
			>
				<img
					src={edition.image}
					alt="Photos de l'édition {edition.title}"
					class="aspect-[4/3] w-full object-cover grayscale-0 transition-all group-hover:grayscale"
				/>
				<p class="mt-2 text-center text-2xl">{edition.title} · {edition.year} →</p>
			</a>
		{/each}
	</div>
</section>

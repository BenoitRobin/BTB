<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { mainEdition, otherEditions } from '$lib/data/editions';
	import placeholder2026 from '$lib/assets/placeholder/placeholder2026.png';
	import placeholder2025 from '$lib/assets/placeholder/placeholder2025.png';
	import placeholder2024 from '$lib/assets/placeholder/placeholder2024.png';

	const editionImages = [placeholder2025, placeholder2024];
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="my-work" title="Comment c'était avant ?" />
	</div>

	<div class="mx-auto mt-8 mb-16 w-full max-w-6xl px-6">
		<a href={mainEdition.galleryUrl} target="_blank" rel="noreferrer" class="group mb-8 block">
			<img
				src={placeholder2026}
				alt={mainEdition.title}
				class="aspect-video w-full rounded-2xl object-cover grayscale transition-all group-hover:grayscale-0"
			/>
		</a>
		<div class="mt-4 flex items-center justify-between">
			<div>
				<h3 class="text-2xl font-semibold">{mainEdition.title}</h3>
				<p class="text-[#5e5e5e]">Chantelle, Allier</p>
			</div>
			<a
				href={mainEdition.galleryUrl}
				target="_blank"
				rel="noreferrer"
				class="block rounded-full border border-black px-6 text-3xl leading-[1.8]"
			>
				→
			</a>
		</div>

		<div class="mt-10 flex flex-wrap justify-between gap-6">
			{#each otherEditions as edition, i (edition.slug)}
				<article class="w-full sm:w-[48%]">
					<a href={edition.galleryUrl} target="_blank" rel="noreferrer" class="group block">
						<img
							src={editionImages[i]}
							alt={edition.title}
							class="h-[300px] w-full rounded-2xl object-cover grayscale transition-all group-hover:grayscale-0"
						/>
					</a>
					<div class="mt-3 flex items-center justify-between">
						<div>
							<h3 class="font-semibold">{edition.title}</h3>
							<p class="text-[#5e5e5e]">{edition.year}</p>
						</div>
						<a
							href={edition.galleryUrl}
							target="_blank"
							rel="noreferrer"
							class="block rounded-full border border-black px-4 text-xl leading-[1.8]"
						>
							→
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

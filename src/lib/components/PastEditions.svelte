<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { mainEdition, otherEditions } from '$lib/data/editions';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="my-work" title="Comment c'était avant ?" />
	</div>

	<div class="mx-auto mt-8 mb-16 w-full max-w-6xl px-6">
		<a href="/work/{mainEdition.slug}" class="group mb-8 block">
			<div
				class="flex aspect-video w-full items-center justify-center rounded-2xl"
				style="background: linear-gradient(135deg, #1a1a1a, #5e5e5e);"
			>
				<span class="text-lg text-white/70">Photo à venir</span>
			</div>
		</a>
		<div class="mt-4 flex items-center justify-between">
			<div>
				<h3 class="text-2xl font-semibold">{mainEdition.title}</h3>
				<p class="text-[#5e5e5e]">Chantelle, Allier</p>
			</div>
			<a
				href="/work/{mainEdition.slug}"
				class="block rounded-full border border-black px-6 text-3xl leading-[1.8]"
			>
				→
			</a>
		</div>

		<div class="mt-10 flex flex-wrap justify-between gap-6">
			{#each otherEditions as edition (edition.slug)}
				<article class="w-full sm:w-[48%]">
					<a href="/work/{edition.slug}" class="block">
						<div
							class="flex h-[300px] w-full items-center justify-center rounded-2xl"
							style="background: linear-gradient(135deg, #1a1a1a, #5e5e5e);"
						>
							<span class="text-sm text-white/70">Photo à venir</span>
						</div>
					</a>
					<div class="mt-3 flex items-center justify-between">
						<div>
							<h3 class="font-semibold">{edition.title}</h3>
							<p class="text-[#5e5e5e]">{edition.year}</p>
						</div>
						<a href="/work/{edition.slug}" class="block rounded-full border border-black px-4 text-xl leading-[1.8]">
							→
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

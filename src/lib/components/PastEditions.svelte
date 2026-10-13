<script lang="ts">
	import { tick } from 'svelte';
	import SectionHeading from './SectionHeading.svelte';
	import Button from './Button.svelte';
	import { mainEdition, otherEditions } from '$lib/data/editions';
	import type { EditionPhoto } from '$lib/server/lightroom';
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

	// Photo lists by edition slug: undefined = not fetched yet, null = loading, [] = failed or empty.
	let photosBySlug = $state<Record<string, EditionPhoto[] | null>>({});
	let openSlug = $state<string | null>(null);
	let panel: HTMLElement | undefined = $state();

	let viewer: HTMLDialogElement;
	let viewerIndex = $state(0);

	const openEdition = $derived(editions.find((e) => e.slug === openSlug));
	const openPhotos = $derived(openSlug ? photosBySlug[openSlug] : undefined);

	async function toggle(slug: string) {
		openSlug = openSlug === slug ? null : slug;
		if (!openSlug) return;
		if (photosBySlug[slug] === undefined) {
			photosBySlug[slug] = null;
			try {
				const res = await fetch(`/api/editions/${slug}`);
				photosBySlug[slug] = res.ok ? await res.json() : [];
			} catch {
				photosBySlug[slug] = [];
			}
		}
		await tick();
		panel?.scrollIntoView({ block: 'start' });
	}

	function showPhoto(index: number) {
		viewerIndex = index;
		if (!viewer.open) viewer.showModal();
	}

	function step(delta: number) {
		const count = openPhotos?.length ?? 0;
		if (count) viewerIndex = (viewerIndex + delta + count) % count;
	}

	function onViewerKey(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="editions" title="Comment c'était avant ?" />

	<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each editions as edition, i (edition.slug)}
			<button
				type="button"
				onclick={() => toggle(edition.slug)}
				aria-expanded={openSlug === edition.slug}
				aria-controls="edition-gallery"
				class={[
					'group block border-2 border-ink bg-white p-3 pb-2 text-left shadow-sketch transition-transform hover:rotate-0',
					openSlug === edition.slug ? 'rotate-0' : tilts[i % tilts.length]
				]}
			>
				<img
					src={edition.image}
					alt="Photos de l'édition {edition.title}"
					class="aspect-[4/3] w-full object-cover grayscale-0 transition-all group-hover:grayscale"
				/>
				<p class="mt-2 text-center text-2xl">
					{edition.title} · {edition.year}
					<span aria-hidden="true">{openSlug === edition.slug ? '↑' : '↓'}</span>
				</p>
			</button>
		{/each}
	</div>

	<div id="edition-gallery" bind:this={panel} class="scroll-mt-28">
		{#if openEdition}
			<div class="mt-10 sketch-alt bg-white p-4 sm:p-6">
				<div class="mb-5 flex flex-wrap items-baseline justify-between gap-2">
					<h3 class="font-display text-3xl">
						{openEdition.title} · {openEdition.year}
						{#if openPhotos?.length}<span class="text-pencil">
								— {openPhotos.length} photos</span
							>{/if}
					</h3>
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external URL, not an app route -->
					<a
						href={openEdition.galleryUrl}
						target="_blank"
						rel="noreferrer"
						class="border-b-2 border-dashed border-ink text-xl hover:border-solid"
						>Voir l'album sur Lightroom ↗</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</div>

				{#if openPhotos === null}
					<p class="py-10 text-center text-2xl">Chargement des photos…</p>
				{:else if !openPhotos?.length}
					<div class="flex flex-col items-center gap-4 py-8 text-center">
						<p class="text-2xl">Les photos ne se chargent pas ici pour le moment.</p>
						<Button href={openEdition.galleryUrl} variant="paper" external
							>Voir les photos sur Lightroom</Button
						>
					</div>
				{:else}
					<ul class="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
						{#each openPhotos as photo, i (photo.id)}
							<li>
								<button
									type="button"
									onclick={() => showPhoto(i)}
									class="block w-full border-2 border-ink bg-white p-1 transition-transform hover:-rotate-1"
								>
									<img
										src={photo.thumbUrl}
										alt="Photo {i + 1} sur {openPhotos.length} de {openEdition.title}"
										loading="lazy"
										class="aspect-square w-full bg-paper object-cover"
									/>
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- Native modal: focus trapping and Escape-to-close come for free. Clicking the backdrop (the dialog itself) closes it. -->
<dialog
	bind:this={viewer}
	onkeydown={onViewerKey}
	onclick={(event) => event.target === viewer && viewer.close()}
	aria-label="Photo agrandie"
	class="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-ink/90"
>
	{#if openEdition && openPhotos?.length}
		{@const photo = openPhotos[viewerIndex]}
		<div class="pointer-events-none flex h-full flex-col items-center justify-center gap-3 p-4">
			<img
				src={photo.fullUrl}
				alt="Photo {viewerIndex + 1} sur {openPhotos.length} de {openEdition.title}"
				class="pointer-events-auto max-h-[80dvh] max-w-full border-4 border-white object-contain shadow-sketch"
			/>
			<div class="pointer-events-auto flex items-center gap-3">
				<Button size="nav" variant="paper" onclick={() => step(-1)}>
					<span aria-hidden="true">←</span><span class="sr-only">Photo précédente</span>
				</Button>
				<p class="min-w-24 text-center text-xl text-white" aria-live="polite">
					{viewerIndex + 1} / {openPhotos.length}
				</p>
				<Button size="nav" variant="paper" onclick={() => step(1)}>
					<span aria-hidden="true">→</span><span class="sr-only">Photo suivante</span>
				</Button>
				<Button size="nav" variant="pink" onclick={() => viewer.close()}>Fermer</Button>
			</div>
		</div>
	{/if}
</dialog>

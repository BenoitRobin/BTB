<script lang="ts">
	import Button from './Button.svelte';
	import type { Edition } from '$lib/data/editions';
	import type { EditionPhoto } from '$lib/server/lightroom';

	let { edition, photos }: { edition: Edition; photos: EditionPhoto[] } = $props();

	let viewer = $state<HTMLDialogElement>();
	let viewerIndex = $state(0);
	// The full-size photo is only rendered while the viewer is open, so it isn't downloaded on page load.
	let viewerOpen = $state(false);

	function showPhoto(index: number) {
		viewerIndex = index;
		viewerOpen = true;
		if (!viewer?.open) viewer?.showModal();
	}

	function step(delta: number) {
		viewerIndex = (viewerIndex + delta + photos.length) % photos.length;
	}

	function onViewerKey(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}
</script>

<ul class="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
	{#each photos as photo, i (photo.id)}
		<li>
			<button
				type="button"
				onclick={() => showPhoto(i)}
				class="block w-full border-2 border-ink bg-white p-1 transition-transform hover:-rotate-1"
			>
				<img
					src={photo.thumbUrl}
					alt="Photo {i + 1} sur {photos.length} de {edition.title}"
					loading="lazy"
					class="aspect-square w-full bg-paper object-cover"
				/>
			</button>
		</li>
	{/each}
</ul>

<!-- Native modal: focus trapping and Escape-to-close come for free. Clicking the backdrop (the dialog itself) closes it. -->
<dialog
	bind:this={viewer}
	onkeydown={onViewerKey}
	onclose={() => (viewerOpen = false)}
	onclick={(event) => event.target === viewer && viewer?.close()}
	aria-label="Photo agrandie"
	class="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-ink/90"
>
	<div class="pointer-events-none flex h-full flex-col items-center justify-center gap-3 p-4">
		{#if viewerOpen}
			<img
				src={photos[viewerIndex].fullUrl}
				alt="Photo {viewerIndex + 1} sur {photos.length} de {edition.title}"
				class="pointer-events-auto max-h-[80dvh] max-w-full border-4 border-white object-contain shadow-sketch"
			/>
		{/if}
		<div class="pointer-events-auto flex items-center gap-3">
			<Button size="nav" variant="paper" onclick={() => step(-1)}>
				<span aria-hidden="true">←</span><span class="sr-only">Photo précédente</span>
			</Button>
			<p class="min-w-24 text-center text-xl text-white" aria-live="polite">
				{viewerIndex + 1} / {photos.length}
			</p>
			<Button size="nav" variant="paper" onclick={() => step(1)}>
				<span aria-hidden="true">→</span><span class="sr-only">Photo suivante</span>
			</Button>
			<Button size="nav" variant="pink" onclick={() => viewer?.close()}>Fermer</Button>
		</div>
	</div>
</dialog>

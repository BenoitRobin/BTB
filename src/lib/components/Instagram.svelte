<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import Button from './Button.svelte';
	import type { InstagramPost } from '$lib/server/instagram';
	import videoSrc from '$lib/assets/instagram-video.mp4';

	let { posts }: { posts: InstagramPost[] } = $props();

	const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'];

	let video: HTMLVideoElement;
	let muted = $state(true);

	function altText(caption: string) {
		const text = caption.replace(/\s+/g, ' ').trim();
		if (!text) return 'Publication Instagram de Bouge Ton Bouble';
		return text.length > 100 ? `${text.slice(0, 100)}…` : text;
	}

	// The ~7 MB clip only downloads and plays while it is on screen (preload="none", no autoplay).
	// With reduced motion it never starts by itself: it just shows its first frame until sound is asked for.
	function playWhenVisible(node: HTMLVideoElement) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			node.preload = 'metadata';
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			// play() rejects if the browser blocks it; the video then simply stays paused.
			if (entry.isIntersecting) node.play().catch(() => {});
			else node.pause();
		});
		observer.observe(node);
		return () => observer.disconnect();
	}

	function toggleSound() {
		muted = !muted;
		// Unmute and play right inside the tap: iOS Safari pauses a muted-autoplay video unmuted any later
		// (e.g. by Svelte's DOM update after this handler). Asking for sound is also an explicit request to
		// watch, even if reduced motion kept it paused; play() on a playing video does nothing.
		video.muted = muted;
		if (!muted) video.play().catch(() => {});
	}
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="instagram" title="Ça se passe sur Insta" />

	<!-- With posts: grid 70% / video 30% side by side from md, video under the grid on smaller screens.
	     Without posts (e.g. expired token): the video alone, centred. -->
	<div
		class={[
			'mt-8 grid gap-10 md:items-center md:gap-8',
			posts.length > 0 && 'md:grid-cols-[7fr_3fr]'
		]}
	>
		{#if posts.length}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
				{#each posts as post, i (post.id)}
					<a
						href={post.permalink}
						target="_blank"
						rel="external noreferrer"
						class={[
							'block polaroid p-2 transition-transform hover:rotate-0 sm:p-3',
							tilts[i % tilts.length],
							// Two columns on phones: drop an odd last post rather than leave it alone on its row.
							posts.length % 2 === 1 && i === posts.length - 1 && 'max-sm:hidden'
						]}
					>
						<img
							src={post.imageUrl}
							alt={altText(post.caption)}
							loading="lazy"
							class="aspect-square w-full object-cover"
						/>
					</a>
				{/each}
			</div>
		{/if}

		<div
			class={[
				'relative mx-auto w-full max-w-xs rotate-1 polaroid p-2 transition-transform hover:rotate-0 sm:p-3',
				posts.length > 0 && 'md:max-w-none'
			]}
		>
			<video
				bind:this={video}
				src={videoSrc}
				preload="none"
				{muted}
				loop
				playsinline
				aria-label="Vidéo du festival Bouge Ton Bouble"
				class="block aspect-[9/16] w-full bg-ink object-cover"
				{@attach playWhenVisible}
			></video>

			<button
				type="button"
				onclick={toggleSound}
				aria-label={muted ? 'Activer le son' : 'Couper le son'}
				aria-pressed={!muted}
				class="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center sketch bg-white text-ink shadow-sketch transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none sm:right-5 sm:bottom-5"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					class="h-6 w-6"
				>
					<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
					{#if muted}
						<path d="M17 9l5 6M22 9l-5 6" />
					{:else}
						<path d="M16.5 8.5a5 5 0 0 1 0 7M19.5 5.5a9 9 0 0 1 0 13" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<div class="mt-10 flex justify-center">
		<Button href="https://www.instagram.com/bougetonbouble/" variant="paper" external>
			Suivre @bougetonbouble
		</Button>
	</div>
</section>

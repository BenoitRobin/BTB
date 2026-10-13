<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionHeading from './SectionHeading.svelte';
	import { editions } from '$lib/data/editions';
	const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'];

	// Four strokes of the hover burst (top, right, bottom, left). Fixed but mismatched timings, so they
	// never fall back in sync and read as random, without a server/browser mismatch from Math.random.
	const rays = [
		{ d: 'M12 7V1', duration: 0.34, delay: -0.05 },
		{ d: 'M17 12H23', duration: 0.45, delay: -0.25 },
		{ d: 'M12 17V23', duration: 0.31, delay: -0.17 },
		{ d: 'M7 12H1', duration: 0.51, delay: -0.38 }
	];
</script>

<section class="mx-auto mt-20 w-full max-w-6xl px-6">
	<SectionHeading id="editions" title="Comment c'était avant ?" />

	<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each editions as edition, i (edition.slug)}
			<a
				href={resolve('/editions/[slug]', { slug: edition.slug })}
				class="card group block border-2 border-ink bg-white p-3 pb-2 shadow-sketch transition-transform hover:rotate-0 {tilts[
					i % tilts.length
				]}"
			>
				<img
					src={edition.image}
					alt="Photos de l'édition {edition.title}"
					class="aspect-[4/3] w-full object-cover grayscale-0 transition-all group-hover:grayscale"
				/>
				<p class="mt-2 flex items-center justify-center gap-1.5 text-2xl">
					{edition.title} · {edition.year}
					<span class="nudge inline-block" aria-hidden="true">→</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						aria-hidden="true"
						class="burst ml-1.5 h-6 w-6"
					>
						{#each rays as ray (ray.d)}
							<path
								d={ray.d}
								class="ray"
								style="--ray-duration: {ray.duration}s; --ray-delay: {ray.delay}s"
							/>
						{/each}
					</svg>
				</p>
			</a>
		{/each}
	</div>
</section>

<style>
	/* The burst only shows while the card is hovered. */
	/* Tilted off the right angle so it feels hand-drawn; `rotate` stacks with the hover `transform`. */
	.burst {
		rotate: 20deg;
		opacity: 0;
		transform: scale(0.4);
		transition:
			opacity 150ms ease-out,
			transform 200ms ease-out;
	}
	.card:hover .burst {
		opacity: 1;
		transform: scale(1);
	}

	.ray {
		transform-box: view-box;
		transform-origin: 12px 12px;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* The arrow keeps nudging towards where the burst pops up. */
		.nudge {
			animation: nudge 1.2s ease-in-out infinite;
		}
		/* While hovered the burst spins and each stroke flickers on its own rhythm. */
		.card:hover .burst {
			animation: spin 1.6s linear infinite;
		}
		.card:hover .ray {
			animation: flicker var(--ray-duration) ease-in-out var(--ray-delay) infinite alternate;
		}
	}

	@keyframes nudge {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(5px);
		}
	}

	/* Starts from the resting 20° tilt. */
	@keyframes spin {
		from {
			rotate: 20deg;
		}
		to {
			rotate: 380deg;
		}
	}

	@keyframes flicker {
		from {
			transform: scale(0.7);
			opacity: 0.6;
		}
		to {
			transform: scale(1.15);
			opacity: 1;
		}
	}
</style>

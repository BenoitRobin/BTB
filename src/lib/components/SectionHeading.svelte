<script lang="ts">
	let { title, id }: { title: string; id?: string } = $props();

	// Server render stays 'static' (fully visible); once hydrated the underline hides until it scrolls into view.
	let phase = $state<'static' | 'armed' | 'shown'>('static');

	function reveal(node: HTMLElement) {
		phase = 'armed';
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					phase = 'shown';
					observer.disconnect();
				}
			},
			{ threshold: 0.6 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}
</script>

<div {id} class="scroll-mt-28 {phase}" {@attach reveal}>
	<h2 class="text-4xl leading-none md:text-5xl">{title}</h2>
	<svg width="180" height="16" viewBox="0 0 180 16" aria-hidden="true" class="mt-2 block">
		<path
			d="M2 10 C 40 2, 70 15, 110 7 S 160 4, 178 9"
			fill="none"
			stroke="var(--color-pink)"
			stroke-width="5"
			stroke-linecap="round"
			pathLength="1"
			stroke-dasharray="1 2"
		/>
	</svg>
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		/* Slightly past 1 so the zero-length dash (and its round cap dot) sits off the path. */
		.armed path {
			stroke-dashoffset: 1.05;
		}
		/* Drawn like a pen stroke once the heading is on screen. */
		.shown path {
			animation: draw 600ms ease-out 150ms both;
		}
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 1.05;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>

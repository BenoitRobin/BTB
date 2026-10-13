<script lang="ts">
	import Button from './Button.svelte';
	import bobImg from '$lib/assets/bob.png';
	import cloudDateImg from '$lib/assets/cloudDate.svg';

	// `glue` puts the gap inside the word so the highlight carries across to the next word.
	const titleWords = [
		{ text: "J'organise" },
		{ text: 'un' },
		{ text: "p'tit" },
		{ text: 'raoût', highlight: true, glue: true },
		{ text: 'musical', highlight: true },
		{ text: 'avec' },
		{ text: 'mes' },
		{ text: 'amis.' }
	];
	// Scrambled but fixed arrival order (stride 3 over 8 words): a random order would differ between server and browser.
	const arrival = (i: number) => (i * 3) % titleWords.length;
</script>

<section
	class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-10 pb-16 md:flex-row md:items-center"
>
	<div class="flex min-w-0 flex-col items-start gap-6 md:flex-[3]">
		<p class="-rotate-2 text-2xl">
			Hello, je m'appelle Robert <span class="bob-arrow" aria-hidden="true">↓</span>
		</p>
		<h1 class="text-5xl leading-[0.95] md:text-5xl lg:text-6xl">
			{#each titleWords as word, i (i)}<span
					class={['title-word', word.highlight && 'highlight']}
					style="--arrival: {arrival(i)}">{word.text}{word.glue ? '\u00a0' : ''}</span
				>{word.glue ? '' : ' '}{/each}
		</h1>
		<p class="max-w-[34ch] text-2xl">
			Des fanfares plein les rues de Chantelle. Viendez nous retrouver !
		</p>
		<div class="flex flex-wrap gap-4">
			<Button href="/#contact" variant="pink">Ta fanfare veut venir ?</Button>
			<Button href="/#contact" variant="paper">Devenir bénévole</Button>
		</div>
	</div>

	<figure class="relative mx-auto w-full max-w-sm p-4 md:flex-[2]">
		<div
			class="absolute top-1 left-[38%] z-10 h-7 w-28 -rotate-3 bg-pink/55"
			aria-hidden="true"
		></div>
		<div class="relative rotate-2">
			<img
				src={bobImg}
				alt="Bob, la mascotte du festival, de dos face au village de Chantelle"
				class="photo-in block h-auto w-full border-2 border-ink bg-white p-2.5"
			/>
			<div class="poster-roll" aria-hidden="true"></div>
		</div>
		<img
			src={cloudDateImg}
			alt="BTB#9, le 29 mai 2027"
			class="cloud-in absolute top-[12%] -left-4 z-10 w-60 -rotate-[4deg] drop-shadow-[3px_4px_0_var(--color-ink)] md:-left-14 md:w-72"
		/>
		<figcaption class="absolute -right-1 -bottom-6 -rotate-3 text-xl">
			<span class="bob-arrow bob-arrow--diagonal" aria-hidden="true">↖</span> lui, c'est Bob !
		</figcaption>
	</figure>
</section>

<style>
	.title-word {
		display: inline-block;
	}

	.bob-arrow {
		display: inline-block;
		--bob-to: translateY(5px);
	}

	/* Points up-left, so it nudges that way, half a cycle out of step with the ↓ arrow. */
	.bob-arrow--diagonal {
		--bob-to: translate(-4px, -4px);
		--bob-delay: -0.6s;
	}

	@media (prefers-reduced-motion: no-preference) {
		.title-word {
			animation: word-in 450ms cubic-bezier(0.34, 1.4, 0.64, 1) calc(var(--arrival) * 110ms) both;
		}

		/* Marker stroke once the whole sentence is in (last word lands at 7 × 110 + 450 ms), one highlighted word after the other. */
		.title-word.highlight {
			--marker-step: 0;
			background-repeat: no-repeat;
			animation:
				word-in 450ms cubic-bezier(0.34, 1.4, 0.64, 1) calc(var(--arrival) * 110ms) both,
				marker 250ms ease-in calc(1300ms + var(--marker-step) * 250ms) both;
		}

		.title-word.highlight + .title-word.highlight {
			--marker-step: 1;
		}

		.bob-arrow {
			animation: bob 1.2s ease-in-out var(--bob-delay, 0s) infinite;
		}
	}

	/* Clips from the bottom: a short peek, a pause, then the rest rolls down. */
	@keyframes unroll {
		0% {
			clip-path: inset(0 0 100% 0);
			animation-timing-function: ease-out;
		}
		20% {
			clip-path: inset(0 0 88% 0);
		}
		35% {
			clip-path: inset(0 0 88% 0);
			animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1);
		}
		100% {
			clip-path: inset(0 0 0 0);
		}
	}

	/* Same keyframe stops and easing as `unroll`, so the roll stays on the paper's edge. */
	@keyframes roll-down {
		0% {
			top: 0;
			height: 36px;
			animation-timing-function: ease-out;
		}
		20% {
			top: 12%;
			height: 35px;
		}
		35% {
			top: 12%;
			height: 35px;
			animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1);
		}
		100% {
			top: 100%;
			height: 18px;
		}
	}

	@keyframes roll-gone {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}

	/* Desktop only: on phones the photo sits below the fold, so these would play unseen. */
	@media (prefers-reduced-motion: no-preference) and (min-width: 48rem) {
		/* First load: the tape is already up, the poster peeks out under it, unrolls downward, then the cloud drifts in.
		   Animations use `clip-path`/`translate` so they stack with the Tailwind `rotate` utilities. */
		.photo-in {
			animation: unroll 1300ms both;
		}

		/* The paper still rolled up: rides the unrolling edge, thins out, then vanishes at the bottom. */
		.poster-roll {
			position: absolute;
			top: 0;
			left: -6px;
			right: -6px;
			translate: 0 -50%;
			border: 2px solid var(--color-ink);
			border-radius: 999px;
			background: linear-gradient(
				to bottom,
				#fff 0%,
				#fff 30%,
				var(--color-paper) 55%,
				var(--color-dots) 100%
			);
			box-shadow: var(--shadow-sketch);
			animation:
				roll-down 1300ms both,
				roll-gone 150ms 1300ms both;
		}

		.cloud-in {
			animation: cloud-in 900ms cubic-bezier(0.34, 1.4, 0.64, 1) 1350ms both;
		}
	}

	@keyframes word-in {
		from {
			opacity: 0;
			translate: -30px 0;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes marker {
		from {
			background-size: 0% 100%;
		}
		to {
			background-size: 100% 100%;
		}
	}

	@keyframes cloud-in {
		from {
			translate: -40px 0;
			opacity: 0;
		}
		to {
			translate: 0 0;
			opacity: 1;
		}
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: var(--bob-to);
		}
	}
</style>

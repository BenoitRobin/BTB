<script lang="ts">
	import bingoSvg from '$lib/assets/bingo-btb9.svg';
	import tamponSvg from '$lib/assets/tampon-btb.svg';
	import tamponBlancSvg from '$lib/assets/tampon-btb-blanc.svg';
	import { tick, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import BingoBurst from './BingoBurst.svelte';
	import ContactForm from './ContactForm.svelte';
	import { BINGO_FREE_SQUARE, BINGO_SQUARE_SHAPES, BINGO_SQUARES } from '$lib/data/bingo';
	import { renderBingoImage, stampTilt } from '$lib/bingoImage';

	let { form }: { form: ComponentProps<typeof ContactForm>['form'] } = $props();

	const fresh = () => BINGO_SQUARES.map((_, i) => i === BINGO_FREE_SQUARE);
	let checked = $state(fresh());

	const rows = [0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => r * 5 + c));
	const lines = [
		...rows,
		...rows.map((_, c) => rows.map((row) => row[c])),
		rows.map((row, i) => row[i]),
		rows.map((row, i) => row[4 - i])
	];
	const bingo = $derived(lines.some((line) => line.every((i) => checked[i])));

	// "Envoyer à Bob" closes the burst and opens the contact form below; it comes back on the next bingo.
	let burstClosed = $state(false);
	let sendOpen = $state(false);
	let shareHint = $state('');
	// Built as soon as the burst shows, so the share sheet opens right on the tap (iOS drops slow taps).
	let image: Promise<File> | undefined;
	$effect(() => {
		if (!bingo) burstClosed = false;
		if (bingo && !burstClosed) {
			image = renderBingoImage($state.snapshot(checked));
			image.catch((error) => console.error(error));
		}
	});

	function replay() {
		checked = fresh();
		shareHint = '';
	}

	async function shareOnInstagram() {
		shareHint = '';
		let file: File;
		try {
			file = await image!;
		} catch {
			shareHint = "Oups, l'image n'a pas pu être créée.";
			return;
		}
		// Phones: the share sheet offers Instagram. Computers (whose share sheet has no Instagram): download the image.
		if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
			try {
				await navigator.share({ files: [file] });
				return;
			} catch (error) {
				if ((error as Error).name === 'AbortError') return; // share sheet dismissed
			}
		}
		const link = document.createElement('a');
		link.href = URL.createObjectURL(file);
		link.download = file.name;
		link.click();
		URL.revokeObjectURL(link.href);
		shareHint = 'Image enregistrée : poste-la sur Instagram avec #bingobtb9 !';
	}

	async function sendToBob() {
		burstClosed = true;
		sendOpen = true;
		await tick();
		document.getElementById('contact')?.scrollIntoView();
	}
</script>

<div class="mx-auto w-full max-w-2xl">
	<div class="relative polaroid">
		<img src={bingoSvg} alt="" width="1080" height="1080" class="block w-full" />
		<!-- Inverts checked squares: white box over the drawing in "difference" mode turns the box black and its text white.
		     The black stroke leaves the box outline untouched. The orange free square is left as is. -->
		<svg
			viewBox="0 0 1080 1080"
			aria-hidden="true"
			class="invert-layer absolute inset-0 h-full w-full"
		>
			{#each BINGO_SQUARE_SHAPES as d, i (i)}
				{#if i !== BINGO_FREE_SQUARE}
					<path {d} fill="#fff" stroke="#000" stroke-width="5" class:on={checked[i]} />
				{/if}
			{/each}
		</svg>
		<!-- Laid over the green board of the SVG (x 89.67→977.32, y 222.14→916.13 out of 1080). -->
		<div
			role="group"
			aria-label="Grille du bingo BTB#9"
			class="absolute grid grid-cols-5 grid-rows-5"
			style="left: 8.3%; top: 20.57%; width: 82.19%; height: 64.26%"
		>
			{#each BINGO_SQUARES as label, i (i)}
				<button
					type="button"
					aria-label={label}
					aria-pressed={checked[i]}
					disabled={i === BINGO_FREE_SQUARE}
					onclick={() => (checked[i] = !checked[i])}
					class="relative rounded-xl"
				>
					{#if checked[i]}
						<!-- White-line stamp on the inverted (black) squares. -->
						<img
							src={i === BINGO_FREE_SQUARE ? tamponSvg : tamponBlancSvg}
							alt=""
							class="stamp absolute inset-[8%] h-[84%] w-[84%] object-contain"
							style="--tilt: {stampTilt(i)}deg"
						/>
					{/if}
				</button>
			{/each}
		</div>
		{#if bingo && !burstClosed}
			<div
				class="veil absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper/80"
			>
				<!-- A tap anywhere outside the choices starts a new grid (keyboard users have "Rejouer"). -->
				<button
					type="button"
					tabindex="-1"
					aria-hidden="true"
					onclick={replay}
					class="absolute inset-0 cursor-pointer"
				></button>
				<span class="pointer-events-none relative block w-[62%]"><BingoBurst /></span>
				<div class="relative flex flex-wrap justify-center gap-3 px-3">
					<Button size="nav" variant="paper" onclick={replay}>Rejouer</Button>
					<Button size="nav" variant="pink" onclick={shareOnInstagram}>Poste sur ton insta</Button>
					<Button size="nav" onclick={sendToBob}>Envoyer à Bob</Button>
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-8 flex flex-wrap items-center justify-between gap-4">
		<p aria-live="polite" class="min-w-0 flex-1">
			<span class="sr-only">{bingo ? 'BINGO !' : ''}</span>
			{shareHint}
		</p>
		<Button variant="paper" onclick={replay}>Recommencer</Button>
	</div>
</div>

{#if sendOpen}
	<!-- ContactForm brings its own side padding (made for the home page): cancel the page's. -->
	<div class="-mx-6">
		<ContactForm {form} bingo={BINGO_SQUARES.filter((_, i) => checked[i])} />
	</div>
{/if}

<style>
	.invert-layer {
		mix-blend-mode: difference;
		pointer-events: none;
	}
	.invert-layer path {
		opacity: 0;
	}
	.invert-layer path.on {
		opacity: 1;
	}

	.stamp {
		transform: rotate(var(--tilt));
	}

	@media (prefers-reduced-motion: no-preference) {
		.invert-layer path {
			transition: opacity 250ms ease-out;
		}
		.stamp {
			animation: stamp 200ms ease-out;
		}
		.veil {
			animation: fade 250ms ease-out;
		}
	}

	@keyframes stamp {
		from {
			opacity: 0;
			transform: rotate(var(--tilt)) scale(1.4);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}
</style>

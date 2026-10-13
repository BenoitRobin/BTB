<script lang="ts">
	const message =
		'Prochaine édition BTB#9 · préparez vos slips pour le 29 mai 2027 · fanfarons à vos candidatures !';
</script>

<div class="mx-auto my-6 w-full max-w-6xl px-4 sm:px-6">
	<div class="marquee -rotate-[0.6deg] overflow-hidden sketch-alt bg-sky py-2">
		<div class="marquee__track flex w-max items-center whitespace-nowrap">
			{#each [false, true] as hidden (hidden)}
				<span
					class="flex items-center font-display text-2xl tracking-wide text-ink sm:text-3xl md:text-4xl"
					aria-hidden={hidden || undefined}
				>
					{#each { length: 6 }, i (i)}
						<span class="flex items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-8 md:pr-8">
							{message}
							<span aria-hidden="true">★</span>
						</span>
					{/each}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.marquee__track {
		animation: marquee 80s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee__track {
			animation: none;
		}
	}
</style>

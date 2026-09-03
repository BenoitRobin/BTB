<script lang="ts">
	const message =
		'Prochaine édition BTB#9 — préparez vos slips pour le 30 mai 2027 — fanfarons à vos candidatures !';
</script>

<div class="marquee overflow-hidden border-y-[3px] border-black bg-[#2babe2] py-2">
	<div class="marquee__track flex w-max items-center whitespace-nowrap">
		{#each [false, true] as hidden}
			<span
				class="banner-text flex items-center gap-4 text-xl font-extrabold tracking-wide text-white uppercase sm:gap-6 sm:text-3xl md:gap-10 md:text-[5rem]"
				aria-hidden={hidden || undefined}
			>
				{#each { length: 6 } as _}
					<span class="flex items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-10 md:pr-10">
						{message}
						<span aria-hidden="true">★</span>
					</span>
				{/each}
			</span>
		{/each}
	</div>
</div>

<style>
	.banner-text {
		font-family: 'Baloo 2', sans-serif;
	}

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

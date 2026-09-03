<script lang="ts">
	const message =
		'Prochaine édition BTB#9 — préparez vos slips pour le 30 mai 2027 — fanfarons à vos candidatures !';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="marquee overflow-hidden border-y-[3px] border-black bg-[#2babe2] py-2">
	<div class="marquee__track flex w-max items-center whitespace-nowrap">
		{#each [false, true] as hidden}
			<span
				class="banner-text flex items-center gap-10 text-[5rem] font-extrabold tracking-wide text-white uppercase"
				aria-hidden={hidden || undefined}
			>
				{#each { length: 6 } as _}
					<span class="flex items-center gap-10 pr-10">
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

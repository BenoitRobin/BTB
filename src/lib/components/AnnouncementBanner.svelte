<script lang="ts">
	const message =
		'Prochaine édition BTB#9 — préparez vos slips pour le 30 mai 2027 — fanfarons à vos candidatures !';
</script>

<div class="marquee overflow-hidden border-y-[3px] border-black bg-[#2babe2] py-14">
	<div class="marquee__track flex w-max items-center whitespace-nowrap">
		{#each [false, true] as hidden}
			<span
				class="flex items-center gap-10 text-6xl font-extrabold tracking-wide text-white uppercase"
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
	.marquee__track {
		animation: marquee 28s linear infinite;
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

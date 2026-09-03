<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { partners } from '$lib/data/partners';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="skills" title="Partenaires" />
	</div>

	<div class="partners-marquee mt-8 mb-16 w-full overflow-hidden">
		<div class="partners-marquee__track flex w-max items-center">
			{#each [false, true] as hidden}
				<div class="flex items-center" aria-hidden={hidden || undefined}>
					{#each partners as partner (partner.name)}
						<svelte:element
							this={partner.url ? 'a' : 'div'}
							href={partner.url}
							target={partner.url ? '_blank' : undefined}
							rel={partner.url ? 'noreferrer' : undefined}
							title={partner.name}
							tabindex={hidden ? -1 : undefined}
							class="mx-8 flex shrink-0 items-center justify-center transition-transform {partner.url
								? 'hover:scale-105'
								: ''}"
						>
							<img
								src={partner.logo}
								alt={partner.name}
								class="h-20 w-auto object-contain md:h-28"
							/>
						</svelte:element>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.partners-marquee__track {
		animation: partners-marquee 40s linear infinite;
	}

	@keyframes partners-marquee {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.partners-marquee__track {
			animation: none;
		}
	}
</style>

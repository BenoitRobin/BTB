<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { partners } from '$lib/data/partners';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="skills" title="Partenaires" />
	</div>

	<div class="mx-auto mt-8 mb-16 flex w-full max-w-6xl justify-center px-6">
		<div class="flex flex-wrap justify-center gap-8">
			{#each partners as partner (partner.name)}
				<svelte:element
					this={partner.url ? 'a' : 'div'}
					href={partner.url}
					target={partner.url ? '_blank' : undefined}
					rel={partner.url ? 'noreferrer' : undefined}
					title={partner.name}
					class="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-black/10 transition-transform md:h-24 md:w-24 {partner.url
						? 'hover:scale-105'
						: ''}"
				>
					<img src={partner.logo} alt={partner.name} class="h-full w-full object-cover" />
				</svelte:element>
			{/each}
		</div>
	</div>
</section>

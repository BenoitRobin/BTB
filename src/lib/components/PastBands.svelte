<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { pastBands } from '$lib/data/pastBands';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="past-bands" title="Ils sont venus !" />
	</div>

	<div class="mx-auto mt-8 mb-16 w-full max-w-6xl px-6">
		<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each pastBands as band (band)}
				<li class="rounded-lg border border-black/10 px-6 py-5 text-lg font-medium">
					{band}
				</li>
			{/each}
		</ul>
	</div>
</section>

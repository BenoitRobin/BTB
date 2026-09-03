<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { skills } from '$lib/data/skills';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="skills" title="Partenaires" />
	</div>

	<div class="mx-auto mt-8 mb-16 flex w-full max-w-6xl justify-center px-6">
		<div class="flex flex-wrap justify-center gap-5">
			{#each skills as icon (icon)}
				<i class="{icon} text-5xl text-black md:text-6xl"></i>
			{/each}
		</div>
	</div>
</section>

<script lang="ts">
	let { title, id }: { title: string; id?: string } = $props();
</script>

<div {id} class="scroll-mt-28">
	<h2 class="text-5xl leading-none md:text-6xl">{title}</h2>
	<svg width="180" height="16" viewBox="0 0 180 16" aria-hidden="true" class="mt-2 block">
		<path
			d="M2 10 C 40 2, 70 15, 110 7 S 160 4, 178 9"
			fill="none"
			stroke="var(--color-pink)"
			stroke-width="5"
			stroke-linecap="round"
		/>
	</svg>
</div>

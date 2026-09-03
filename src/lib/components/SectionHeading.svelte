<script lang="ts">
	let { title, id }: { title: string; id?: string } = $props();
</script>

<div {id}>
	<h2 class="text-4xl font-bold md:text-6xl">{title}</h2>
	<div class="mt-4 h-1 w-10 bg-[#5e5e5e]"></div>
</div>

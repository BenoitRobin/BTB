<script lang="ts">
	import Button from './Button.svelte';
</script>

<nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
	<a href="/" class="text-3xl font-bold">BTB</a>
	<div class="flex items-center gap-8 md:gap-12">
		<a href="/#about-me" class="hidden hover:underline sm:inline">C'est quoi ?</a>
		<a href="/#my-work" class="hidden hover:underline sm:inline">BTB#?</a>
		<a href="/#skills" class="hidden hover:underline sm:inline">Partenaires</a>
		<Button href="/#contact-form" size="nav">Contact</Button>
	</div>
</nav>

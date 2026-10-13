<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import Bingo from '$lib/components/Bingo.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Bingo BTB#9 · Bouge Ton Bouble</title>
	<meta
		name="description"
		content="Le bingo des fanfares de Bouge Ton Bouble : cochez ce que votre fanfare a déjà vécu."
	/>
</svelte:head>

<Navbar />

<main class="mx-auto mb-20 w-full max-w-6xl px-6">
	<div class="mt-8">
		<SectionHeading title="Bingo BTB#9" />
		<!-- One line: the questions only show where they fit. -->
		<p class="mt-4">
			<span class="hidden lg:inline"
				>Votre fanfare a déjà fait pleurer une mamie&nbsp;? Joué un tube de Johnny&nbsp;?</span
			>
			Cochez les cases et visez la ligne&nbsp;!
		</p>
	</div>

	<div class="mt-8">
		<Bingo {form} />
	</div>
</main>

<Footer />

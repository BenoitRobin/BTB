<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';
	import PastBands from '$lib/components/PastBands.svelte';
	import PastEditions from '$lib/components/PastEditions.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Bouge Ton Bouble</title>
</svelte:head>

<Navbar />

<main>
	<Hero />
	<AboutMe />
	<PastBands />
	<PastEditions />
	<Skills />
	<ContactForm />
</main>

<Footer />

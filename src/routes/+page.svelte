<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AnnouncementBanner from '$lib/components/AnnouncementBanner.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';
	import PastBands from '$lib/components/PastBands.svelte';
	import PastEditions from '$lib/components/PastEditions.svelte';
	import Partners from '$lib/components/Partners.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Bouge Ton Bouble</title>
</svelte:head>

<Navbar />

<main>
	<Hero />
	<AnnouncementBanner />
	<AboutMe />
	<PastEditions />
	<PastBands />
	<Partners />
	<ContactForm />
</main>

<Footer />

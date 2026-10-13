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
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import Instagram from '$lib/components/Instagram.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Bouge Ton Bouble · BTB#9 le 29 mai 2027</title>
	<meta
		name="description"
		content="Festival de fanfares à Chantelle, dans l'Allier. Prochaine édition BTB#9 le samedi 29 mai 2027 : fanfares et bénévoles, écrivez-nous !"
	/>
</svelte:head>

<Navbar />

<main>
	<Hero />
	<AnnouncementBanner />
	<Instagram posts={data.instagramPosts} />
	<AboutMe />
	<PastEditions />
	<PastBands />
	<Partners />
	<ContactForm {form} />
</main>

<Footer />

<ScrollToTop />

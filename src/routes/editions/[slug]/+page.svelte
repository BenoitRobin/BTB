<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import EditionGallery from '$lib/components/EditionGallery.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { mainEdition, otherEditions } from '$lib/data/editions';

	let { data } = $props();
	const { edition, photos } = $derived(data);
	const otherAlbums = $derived(
		[mainEdition, ...otherEditions].filter((e) => e.slug !== edition.slug)
	);
</script>

<svelte:head>
	<title>Photos {edition.title} · {edition.year} · Bouge Ton Bouble</title>
	<meta
		name="description"
		content="Les photos de l'édition {edition.title} ({edition.year}) du festival de fanfares Bouge Ton Bouble, à Chantelle."
	/>
</svelte:head>

<Navbar />

<main class="mx-auto mb-20 w-full max-w-6xl px-6">
	<a
		href="{resolve('/')}#editions"
		class="mt-6 inline-block border-b-2 border-dashed border-ink text-xl hover:border-solid"
		>← Retour</a
	>

	<div class="mt-8 flex flex-wrap items-end justify-between gap-4">
		<SectionHeading title="{edition.title} · {edition.year}" />
		<nav aria-label="Autres éditions" class="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-xl">
			<span class="text-pencil">Autres albums :</span>
			{#each otherAlbums as other (other.slug)}
				<a
					href={resolve('/editions/[slug]', { slug: other.slug })}
					class="border-b-2 border-dashed border-ink hover:border-solid hover:highlight"
					>{other.title} · {other.year}</a
				>
			{/each}
		</nav>
	</div>

	<div class="mt-8">
		<!-- Fresh gallery state (viewer position) when moving between albums. -->
		{#key edition.slug}
			<EditionGallery {edition} {photos} />
		{/key}
	</div>
</main>

<Footer />

<ScrollToTop />

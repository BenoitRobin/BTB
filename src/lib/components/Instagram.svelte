<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import Button from './Button.svelte';
	import type { InstagramPost } from '$lib/server/instagram';

	let { posts }: { posts: InstagramPost[] } = $props();

	const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'];

	function altText(caption: string) {
		const text = caption.replace(/\s+/g, ' ').trim();
		if (!text) return 'Publication Instagram de Bouge Ton Bouble';
		return text.length > 100 ? `${text.slice(0, 100)}…` : text;
	}
</script>

{#if posts.length}
	<section class="mx-auto mt-20 w-full max-w-6xl px-6">
		<SectionHeading id="instagram" title="Ça se passe sur Insta" />

		<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
			{#each posts as post, i (post.id)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- external URL, not an app route -->
				<a
					href={post.permalink}
					target="_blank"
					rel="noreferrer"
					class={[
						'block border-2 border-ink bg-white p-2 shadow-sketch transition-transform hover:rotate-0 sm:p-3',
						tilts[i % tilts.length],
						// Two columns on phones: drop an odd last post rather than leave it alone on its row.
						posts.length % 2 === 1 && i === posts.length - 1 && 'max-sm:hidden'
					]}
				>
					<img
						src={post.imageUrl}
						alt={altText(post.caption)}
						loading="lazy"
						class="aspect-square w-full object-cover"
					/>
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/each}
		</div>

		<div class="mt-10 flex justify-center">
			<Button href="https://www.instagram.com/bougetonbouble/" variant="paper" external>
				Suivre @bougetonbouble
			</Button>
		</div>
	</section>
{/if}

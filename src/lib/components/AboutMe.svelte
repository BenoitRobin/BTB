<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import bobImg from '$lib/assets/bob.png';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="about-me" title="J'te parle de moi" />
	</div>

	<div class="mx-auto mt-8 mb-16 flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start">
		<img
			src={bobImg}
			alt="Robert"
			class="h-auto w-full rounded object-contain md:w-2/5"
		/>
		<div class="w-full text-left md:w-3/5">
			<p class="mb-4">
				Depuis presque 10 ans, j'organise un p'tit festival de fanfares avec mes amis dans mon
				village de Chantelle dans l'allier où coule paisiblement la bouble.
			</p>
			<p class="mb-4">
				Grâce à une centaine de bénévoles, Chantelle vibre chaque année au son des fanfarons venus
				de toute la France pour partager un moment convivial le temps d'une soirée inoubliable.
			</p>
			<p class="mb-4">Viens découvrir l'univers des fanfares avec nous !</p>
			<Button href="/#contact-form">Ta fanfare veut venir ?</Button>
		</div>
	</div>
</section>

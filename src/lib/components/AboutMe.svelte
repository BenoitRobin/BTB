<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';

	const facts = ['une dizaine de fanfares', 'trois scènes', 'une centaine de bénévoles'];
</script>

<section class="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row">
	<!-- Wide enough for the title on one line; below lg it sits above the text instead. -->
	<div class="min-w-0 lg:w-96 lg:shrink-0">
		<SectionHeading id="c-est-quoi" title="J'te parle de moi" />
	</div>

	<div class="flex min-w-0 flex-col gap-4 sketch bg-white px-8 py-7 lg:flex-1">
		<p>
			Depuis presque 10 ans, j'organise un p'tit festival de fanfares avec mes amis dans mon village
			de Chantelle, dans l'Allier, là où coule paisiblement la Bouble. Tout est parti d'une idée
			simple, faire la fête au son des fanfares, et c'est devenu, édition après édition, un
			rendez-vous que tout le village et la France attendent avec impatience.
		</p>
		<p>
			Grâce à une centaine de bénévoles qui donnent de leur temps sans compter, Chantelle vibre
			chaque année au son des fanfarons venus d'un peu partout pour bouger leurs « boubles » le
			temps d'une soirée inoubliable. Les rues du village se transforment en scène à ciel ouvert,
			les cuivres et les percussions résonnent d'une scène à l'autre, jusqu'au bout de la nuit.
		</p>
		<p>
			On y croise autant des familles venues en voisins que des passionnés de fanfare venus de loin,
			tous réunis autour des mêmes valeurs : la musique, le partage et la bonne humeur.
		</p>
		<ul class="flex flex-wrap gap-x-7 gap-y-2">
			{#each facts as fact (fact)}
				<li>☑ {fact}</li>
			{/each}
		</ul>
		<p>
			Alors que tu sois musicien, bénévole ou simplement curieux, viens découvrir l'univers des
			fanfares avec nous !
		</p>
		<div>
			<Button href="/#contact">Ta fanfare veut venir ?</Button>
		</div>
	</div>
</section>

<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import bobImg from '$lib/assets/bob.png';
</script>

<section class="mt-16">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="about-me" title="J'te parle de moi" />
	</div>

	<div
		class="mx-auto mt-8 mb-16 flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center"
	>
		<img src={bobImg} alt="Robert" class="h-auto w-full rounded object-contain md:w-2/5" />
		<div class="w-full text-left md:w-3/5">
			<p class="mb-4">
				Depuis presque 10 ans, j'organise un p'tit festival de fanfares avec mes amis dans mon
				village de Chantelle, dans l'Allier, là où coule paisiblement la Bouble. Tout est parti
				d'une idée simple, faire la fête au son des fanfares, et c'est devenu, édition après
				édition, un rendez-vous que tout le village et la France attendent avec impatience.
			</p>
			<p class="mb-4">
				Grâce à une centaine de bénévoles qui donnent de leur temps sans compter, Chantelle vibre
				chaque année au son des fanfarons venus dd'un peu partout pour bouger leurs "boubles" le
				temps d'une soirée inoubliable. Les rues du village se transforment en scène à ciel ouvert,
				les cuivres et les percussions résonnent d'une scène à l'autre, jusqu'au bout de la nuit.
			</p>
			<p class="mb-4">
				Chaque édition, c'est une dizaine de fanfares, débutantes ou aguerries, qui animent nos
				trois scènes et embarquent petits et grands dans une ambiance festive et bon enfant. On y
				croise autant des familles venues en voisins que des passionnés de fanfare venus de loin,
				tous réunis autour des mêmes valeurs : la musique, le partage et la bonne humeur.
			</p>
			<p class="mb-4">
				Alors que tu sois musicien, bénévole ou simplement curieux, viens découvrir l'univers des
				fanfares avec nous !
			</p>
			<Button href="/#contact-form">Ta fanfare veut venir ?</Button>
		</div>
	</div>
</section>

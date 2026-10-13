<script lang="ts" module>
	/** Spiky burst outline in a 400×400 box, shared with the navbar's "Bonus" link. */
	const outer = [178, 150, 185, 160, 172, 145, 188, 158, 176, 150, 183, 162, 170, 148, 186, 155];
	export const burst = outer
		.flatMap((r, i) => {
			const a = (i / outer.length) * 2 * Math.PI;
			const b = a + Math.PI / outer.length;
			const inner = r * 0.72;
			return [
				[200 + r * Math.cos(a), 200 + r * Math.sin(a)],
				[200 + inner * Math.cos(b), 200 + inner * Math.sin(b)]
			];
		})
		.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
		.join(' ');
</script>

<script lang="ts">
	// Comic "BINGO" explosion, drawn in the site's colors (pink burst, yellow lettering, ink outlines).

	// Speed lines: [angle in degrees, start radius, end radius].
	const speedLines = [
		[-150, 195, 265],
		[-132, 192, 245],
		[-38, 195, 270],
		[-20, 192, 245],
		[22, 195, 262],
		[148, 195, 268],
		[166, 192, 242],
		[58, 200, 255],
		[120, 200, 252]
	].map(([deg, r1, r2]) => {
		const a = (deg * Math.PI) / 180;
		return [
			200 + r1 * Math.cos(a),
			200 + r1 * Math.sin(a),
			200 + r2 * Math.cos(a),
			200 + r2 * Math.sin(a)
		];
	});

	// Each star spins its own way at its own pace. Random is fine: the burst only ever renders in the browser.
	const stars = [
		[40, 60, 14],
		[365, 80, 12],
		[30, 330, 11],
		[372, 345, 15],
		[95, 15, 9]
	].map(([x, y, r]) => ({
		x,
		y,
		r,
		spin: `${(2 + Math.random() * 4).toFixed(1)}s`,
		direction: Math.random() < 0.5 ? 'normal' : 'reverse'
	}));
	const star = (r: number) =>
		Array.from({ length: 10 }, (_, i) => {
			const a = (i * Math.PI) / 5 - Math.PI / 2;
			const d = i % 2 ? r * 0.45 : r;
			return `${(d * Math.cos(a)).toFixed(1)},${(d * Math.sin(a)).toFixed(1)}`;
		}).join(' ');
</script>

<svg viewBox="-60 -60 520 520" aria-hidden="true" class="burst h-full w-full overflow-visible">
	<defs>
		<pattern id="bingo-dots" width="9" height="9" patternUnits="userSpaceOnUse">
			<circle cx="4.5" cy="4.5" r="1.8" fill="var(--color-ink)" />
		</pattern>
		<radialGradient id="bingo-fade">
			<stop offset="0.55" stop-color="#fff" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</radialGradient>
		<mask id="bingo-halftone">
			<circle cx="200" cy="200" r="235" fill="url(#bingo-fade)" />
		</mask>
	</defs>

	<!-- White halo under lines and stars so they read over the busy grid. -->
	<g class="lines" stroke-linecap="round">
		{#each speedLines as [x1, y1, x2, y2], i (i)}
			<line {x1} {y1} {x2} {y2} stroke="#fff" stroke-width="12" />
			<line {x1} {y1} {x2} {y2} stroke="var(--color-ink)" stroke-width="5" />
		{/each}
	</g>
	<rect
		x="-35"
		y="-35"
		width="470"
		height="470"
		fill="url(#bingo-dots)"
		mask="url(#bingo-halftone)"
		opacity="0.35"
	/>

	{#each stars as { x, y, r, spin, direction }, i (i)}
		<g transform="translate({x} {y})">
			<polygon
				points={star(r)}
				fill="var(--color-ink)"
				stroke="#fff"
				stroke-width="4"
				stroke-linejoin="round"
				paint-order="stroke"
				class="star"
				style="animation-duration: {spin}; animation-direction: {direction}"
			/>
		</g>
	{/each}

	<g class="pop">
		<polygon points={burst} transform="translate(7 8)" fill="var(--color-ink)" />
		<polygon
			points={burst}
			fill="var(--color-pink)"
			stroke="var(--color-ink)"
			stroke-width="6"
			stroke-linejoin="round"
		/>
		<g transform="rotate(-8 200 200)" class="word">
			<text x="204" y="236" text-anchor="middle" fill="var(--color-ink)">BINGO</text>
			<text
				x="200"
				y="231"
				text-anchor="middle"
				fill="#f6af33"
				stroke="var(--color-ink)"
				stroke-width="9"
				stroke-linejoin="round"
				paint-order="stroke">BINGO</text
			>
		</g>
	</g>
</svg>

<style>
	text {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 100px;
	}

	.pop,
	.lines {
		transform-origin: 200px 200px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.pop {
			animation: pop 500ms cubic-bezier(0.3, 1.6, 0.5, 1) both;
		}
		.star {
			animation: spin linear infinite;
		}
		.lines {
			animation: pulse 900ms ease-in-out 500ms infinite alternate;
		}
	}

	@keyframes pop {
		from {
			transform: scale(0) rotate(-25deg);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		to {
			transform: scale(1.06);
		}
	}
</style>

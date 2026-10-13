import bingoSvg from '$lib/assets/bingo-btb9.svg';
import tamponSvg from '$lib/assets/tampon-btb.svg';
import tamponBlancSvg from '$lib/assets/tampon-btb-blanc.svg';
import { BINGO_FREE_SQUARE, BINGO_SQUARE_SHAPES } from '$lib/data/bingo';

/** The green board in the 1080×1080 SVG, which the 5×5 grid of buttons covers. */
export const BOARD = { x: 89.67, y: 222.14, width: 887.65, height: 693.99 };

/** Fixed per-square tilt of the stamp (not random), so server and client render the same. */
export const stampTilt = (i: number) => ((i * 37) % 21) - 10;

/** Stamp size relative to a grid cell (the shorter side), as on the page. */
export const STAMP_SCALE = 0.84;

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

/** Draws the ticked grid as the page shows it (inverted squares + stamps) into a 1080×1080 PNG, for Instagram. */
export async function renderBingoImage(checked: boolean[]) {
	const [board, stamp, stampWhite] = await Promise.all(
		[bingoSvg, tamponSvg, tamponBlancSvg].map(loadImage)
	);
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = 1080;
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(board, 0, 0, 1080, 1080);

	const cellW = BOARD.width / 5;
	const cellH = BOARD.height / 5;
	const size = Math.min(cellW, cellH) * STAMP_SCALE;
	checked.forEach((on, i) => {
		if (!on) return;
		if (i !== BINGO_FREE_SQUARE) {
			// Same trick as the page: white in "difference" inverts the box, then the outline is redrawn black.
			const shape = new Path2D(BINGO_SQUARE_SHAPES[i]);
			ctx.globalCompositeOperation = 'difference';
			ctx.fillStyle = '#fff';
			ctx.fill(shape);
			ctx.globalCompositeOperation = 'source-over';
			ctx.lineWidth = 5;
			ctx.strokeStyle = '#000';
			ctx.stroke(shape);
		}
		ctx.save();
		ctx.translate(BOARD.x + cellW * ((i % 5) + 0.5), BOARD.y + cellH * (Math.floor(i / 5) + 0.5));
		ctx.rotate((stampTilt(i) * Math.PI) / 180);
		ctx.drawImage(i === BINGO_FREE_SQUARE ? stamp : stampWhite, -size / 2, -size / 2, size, size);
		ctx.restore();
	});

	const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
	if (!blob) throw new Error('Bingo image: canvas export failed');
	return new File([blob], 'bingo-btb9.png', { type: 'image/png' });
}

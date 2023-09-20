<script>
	import { Heading, Secondary } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let canvas;
	let ctx;
	let texts = [];

	const ELEMENTS = [
    'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];


	function getRandomElement() {
		return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
	}

	/**
	 * @param {number} limit
	 */
	function getRandomPosition(limit) {
		return Math.random() * limit;
	}

	function getRandomSpeed() {
		return Math.random() + 0.4;
	}

	function getRandomFontSize() {
		return Math.random() * 20 + 10;
	}

	function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


	function setCanvasSize() {
		const hero = document.getElementById('hero');
		const rect = hero.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		canvas.style.top = `${rect.top}px`;
		canvas.style.left = `${rect.left}px`;
	}

	function draw() {
		const hero = document.getElementById('hero');
		const rect = hero.getBoundingClientRect();
		ctx.clearRect(0, 0, rect.width, rect.height);
		ctx.fillStyle = 'black';
		texts.forEach(drawText);
	}

	function drawText(text) {
		const hero = document.getElementById('hero');
		const rect = hero.getBoundingClientRect();
		ctx.font = `${text.fontSize}px Arial`;
		ctx.fillStyle = text.color; // 이 부분 추가
		ctx.fillText(text.char, text.x, text.y);
		text.y += text.speed;
		if (text.y > rect.height) {
			text.y = 0;
		}
	}

	function handleResize() {
		setCanvasSize();
		texts = texts.map(updateTextPosition);
	}

	/**
	 * @param {string[]} text
	 */
	function updateTextPosition(text) {
		const hero = document.getElementById('hero');
		const rect = hero.getBoundingClientRect();
		return {
			...text,
			x: getRandomPosition(rect.width),
			y: getRandomPosition(rect.height)
		};
	}

	/**
	 * @param {{ (): void; apply?: any; }} func
	 * @param {number} wait
	 */
	function debounce(func, wait) {
		let timeout;
		return () => {
			const args = arguments;
			const later = () => {
				timeout = null;
				func.apply(this, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	function generateText() {
		return {
			char: getRandomElement(),
			x: getRandomPosition(window.innerWidth),
			y: getRandomPosition(window.innerHeight),
			speed: getRandomSpeed(),
			fontSize: getRandomFontSize(),
			color: getRandomColor()
		};
	}

	onMount(() => {
		texts = Array.from({ length: 25 }, generateText);
		ctx = canvas.getContext('2d');
		setCanvasSize();
		requestAnimationFrame(function animate() {
			draw();
			requestAnimationFrame(animate);
		});
		const DEBOUNCE_DELAY = 300;
		const debouncedHandleResize = debounce(handleResize, DEBOUNCE_DELAY);
		window.addEventListener('resize', debouncedHandleResize);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
		};
	});
</script>

<section
	id="hero"
	class="container overflow-hidden mb-12 mx-auto flex-row pt-6 sm:pt-8 lg:pt-16 pb-6 sm:pb-8 lg:pb-24 px-4 lg:px-20"
>
	<canvas style="position: absolute; z-index: -1;" bind:this={canvas} />
	<div class="text-center" style="z-index: 2">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl"
			>당신의 생각이 책을 완성합니다.<br />
			<Secondary tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl"
				>읽고, 느끼고, 코멘트하세요.</Secondary
			>
		</Heading>
	</div>
</section>

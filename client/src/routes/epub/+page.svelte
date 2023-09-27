<script>
	import { onMount } from 'svelte';
	import ePub from 'epubjs';

	let book;
	let rendition;

	onMount(() => {
		book = ePub('/nwt_KO.epub');
		rendition = book.renderTo('book', {
			spread: 'always',
			height: 'calc(100vh - 72px)'
		});
		rendition.display();

		const next = document.getElementById('next');
		const prev = document.getElementById('prev');
		next.addEventListener('click', function (e) {
			rendition.next();
			e.preventDefault();
		});
		prev.addEventListener('click', function (e) {
			rendition.prev();
			e.preventDefault();
		});
		document.addEventListener('keyup', function (e) {
			if (e.key === 'ArrowLeft') {
				rendition.prev();
			}
			if (e.key === 'ArrowRight') {
				rendition.next();
			}
		});
	});
</script>

<main>
	<div id="book"></div>
	<a id="prev" href="#prev" class="arrow">‹</a>
	<a id="next" href="#next" class="arrow">›</a>
</main>

<style>
	.arrow {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 2.5%; /* 화면의 너비에 따라 조절 가능 */
		font-size: 2em;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.1); /* 반투명 설정 */
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99; /* 다른 요소 위에 표시 */
		cursor: pointer;
	}
	.arrow:hover {
		background-color: rgba(0, 0, 0, 0.3); /* hover 상태에서 더 진한 반투명 설정 */
	}

	#prev {
		left: 0;
	}

	#next {
		right: 0;
	}
</style>

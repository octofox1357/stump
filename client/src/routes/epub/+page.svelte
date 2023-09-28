<script>
	import { onMount } from 'svelte';
	import ePub from 'epubjs';

	let book;
	let rendition;
	let mousePosition;
	let tooltip;
	let iframe;
	let timeout;

	onMount(() => {
		book = ePub('/nwt_KO.epub');
		rendition = book.renderTo('book', {
			spread: 'always',
			height: 'calc(100vh - 72px)'
		});

		rendition.on('rendered', function (section) {
			const iframeElement = document.querySelector('iframe[id^="epubjs-view-"]');

			if (iframeElement instanceof HTMLIFrameElement) {
				iframe = iframeElement;

				iframe.contentWindow.addEventListener('click', function (event) {
					// 툴팁이 이미 있는 경우 제거
					if (tooltip && tooltip.parentNode) {
						tooltip.parentNode.removeChild(tooltip);
					}
				});

				iframe.contentWindow.addEventListener('mousemove', function (event) {
					clearTimeout(timeout); // 기존의 디바운스 타임아웃을 제거
					timeout = setTimeout(() => {
						mousePosition = {
							x: event.clientX,
							y: event.clientY
						};
						console.log(mousePosition);
					}, 100); // 100ms 동안 추가 이벤트가 없으면 실행
				});
			}
		});

		rendition.on('selected', function (cfiRange, contents) {
			tooltip = document.createElement('div');
			tooltip.innerHTML =
				'<button id="highlight">Highlight</button><button id="annotate">Annotate</button>';
			tooltip.style.position = 'fixed';
			tooltip.style.zIndex = '1000';
			tooltip.style.background = 'white';
			tooltip.style.border = '1px solid black';

			tooltip.style.left = `${mousePosition.x}px`;
			tooltip.style.top = `${mousePosition.y}px`;
			if (iframe && iframe.contentDocument) {
				iframe.contentDocument.body.appendChild(tooltip);
			}
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

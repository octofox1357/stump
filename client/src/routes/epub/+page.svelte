<script>
	import { onMount } from 'svelte';
	import ePub from 'epubjs';

	let book;
	let rendition;
	let iframe;
	let isTextSelected = false;

	onMount(() => {
		book = ePub('/nwt_KO.epub');
		rendition = book.renderTo('book', {
			spread: 'always',
			height: 'calc(100vh - 72px)'
		});

		rendition.on('rendered', function (section) {
			// iframe 찾기
			const iframeElement = document.querySelector('iframe[id^="epubjs-view-"]');

			if (iframeElement instanceof HTMLIFrameElement) {
				iframe = iframeElement;

				// 클릭시 툴팁이 이미 있는 경우 제거
				iframe.contentWindow.addEventListener('mousedown', function (event) {
					isTextSelected = false;
					const existingTooltip = iframe.contentDocument.querySelector('.my-tooltip');
					if (existingTooltip) {
						existingTooltip.remove();
					}
				});

				iframe.contentWindow.addEventListener('mouseup', function (event) {
					const existingTooltip = iframe.contentDocument.querySelector('.my-tooltip');
					if (existingTooltip) {
						existingTooltip.remove();
						isTextSelected = false;
					}

					if (isTextSelected) {
						let tooltip = document.createElement('div');
						tooltip.className = 'my-tooltip'; // 클래스 이름 추가
						tooltip.innerHTML =
							'<button id="highlight">Highlight</button><button id="annotate">Annotate</button>';
						tooltip.style.position = 'fixed';
						tooltip.style.zIndex = '999';
						tooltip.style.border = '1px solid black';
						tooltip.style.left = `${event.clientX}px`;
						tooltip.style.top = `${event.clientY}px`;
						if (iframe && iframe.contentDocument) {
							iframe.contentDocument.body.appendChild(tooltip);
						}
						isTextSelected = false; // 툴팁이 생성된 후에 isTextSelected를 false로 설정
					} else {
						const existingTooltip = iframe.contentDocument.querySelector('.my-tooltip');
						if (existingTooltip) {
							existingTooltip.remove();
						}
					}
				});
			}
		});

		rendition.on('selected', function (cfiRange, contents) {
			isTextSelected = true;
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

		window.addEventListener('unload', function () {
			book.destroy();
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

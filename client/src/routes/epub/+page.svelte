<script>
	import { onMount } from 'svelte';
	import ePub from 'epubjs';

	let book;
	let rendition;

	onMount(() => {
		book = ePub('/nwt_KO.epub');
		rendition = book.renderTo('book');
		rendition.display();
	});
</script>

<main class="mx-auto">
	<div id="book"></div>
</main>

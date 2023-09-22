<script>
	import { Blockquote, Layout } from 'flowbite-svelte';
	import { QuoteSolid } from 'flowbite-svelte-icons';
</script>

<section class="container flex justify-between items-center mx-auto">
	<figure class="text-center p-6">
		<QuoteSolid class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" />
		<Blockquote alignment="center" size="2xl">질문이 정답보다 중요하다</Blockquote>
		<figcaption class="flex justify-center items-center mt-6 space-x-3">
			<img
				class="w-6 h-6 rounded-full"
				src="https://w7.pngwing.com/pngs/583/718/png-transparent-albert-einstein-albert-einstein-quotes-physicist-special-relativity-theory-of-relativity-einstein-face-monochrome-head-thumbnail.png"
				alt="아인슈타인"
			/>
			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
				<cite class="pr-3 font-medium text-gray-900 dark:text-white">-아인슈타인</cite>
			</div>
		</figcaption>
	</figure>

	<figure class="text-center p-6">
		<QuoteSolid class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" />
		<Blockquote alignment="center" size="2xl"
			>철​이 철​을 날카롭게 하듯,<br /> 사람​도 친구​를 예리​하게 한다</Blockquote
		>
		<figcaption class="flex justify-center items-center mt-6 space-x-3">
			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
				<cite class="pr-3 font-medium text-gray-900 dark:text-white">-잠언</cite>
			</div>
		</figcaption>
	</figure>

	<figure class="text-center p-6">
		<QuoteSolid class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" />
		<Blockquote alignment="center" size="2xl">대화 없이는 <br /> 지식도 없고 이해도 없다</Blockquote
		>
		<figcaption class="flex justify-center items-center mt-6 space-x-3">
			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
				<cite class="pr-3 font-medium text-gray-900 dark:text-white">-하브루타</cite>
			</div>
		</figcaption>
	</figure>
</section>

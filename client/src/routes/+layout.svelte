<script>
	import '../app.css';
	import { Navbar, NavBrand, NavUl, NavLi } from 'flowbite-svelte';
	let navClass = 'bg-white border-gray-200 p-4 dark:bg-gray-800 no-wrap';
	let navDivClass = 'flex flex-wrap justify-between items-center mx-auto';
</script>

<Navbar {navClass} {navDivClass}>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			BookE
		</span>
	</NavBrand>
	<NavUl
		divClass="flex justify-between items-center w-full w-auto"
		ulClass="flex flex-row mt-4 font-medium space-x-8"
	>
		<NavLi href="/">기업문의</NavLi>
		<NavLi href="/">회사소개</NavLi>
		<NavLi href="/epub">DEMO</NavLi>
	</NavUl>
</Navbar>

<slot />

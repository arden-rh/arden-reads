<script lang="ts">
	import { navigating } from '$app/state';
	import '../app.css';

	// Components
	import Icon from '$lib/components/Icon.svelte';
	import LogotypeIcon from '$lib/components/LogotypeIcon.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import { Diamonds } from 'svelte-loading-spinners';

	import { currentParams, gridSize, menu } from '../states.svelte';
	import { closeMenuAndEnableScroll, enableScroll, disableScrollFunction } from '$lib/functions/scrollFunctions';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	let isLoggedIn = $state(data.isLoggedIn);

	function openMenu() {

		disableScrollFunction();

		if (data.paramMonth) {
			currentParams.month = data.paramMonth;
		}

		if (data.paramYear) {
			menu.activeYear = data.paramYear;
			currentParams.year = data.paramYear;
		} else {
			menu.activeYear = data.year;
		}

		if (menu.open) {
			menu.open = false;
		} else {
			menu.open = true;
		}
	}

	function handleLogoClick() {
		currentParams.month = undefined;
		currentParams.year = undefined;
		menu.open = false;
		enableScroll();
	}

</script>

<div class="flex flex-col justify-between min-h-svh">
	<nav class="text-white p-4 mx-2 mt-2 flex flex-col gap-4 relative">
		<div class="flex justify-between items-center">
			<a
				href="/"
				onclick={() => handleLogoClick()}
				class="flex items-end gap-2 lg:gap-3 hover:text-teal-300 transition-colors duration-300 group"
			>
				<LogotypeIcon
					pathCssClass="fill-white group-hover:fill-teal-300 transition-colors duration-300"
					svgCssClass="h-[33.33px]"
				/>
				<span
					class="rozha-one-regular flex lg:flex text-2xl leading-3 lg:text-3xl lg:leading-5 tracking-wide"
					>A. Reads</span
				>
			</a>
			<div class="flex gap-3 items-center">
				<a href="https://github.com/arden-rh" target="_blank">
					<Icon iconName="github" hover />
				</a>
				<button onclick={() => openMenu()} class="cursor-pointer focus-visible:p-0">
					<Icon iconName="calendar" hover />
				</button>
			</div>
		</div>
		<div
			class="{menu.open
				? 'flex'
				: 'hidden'} flex-col bg-teal-900 p-4 rounded-lg w-[92%] lg:max-w-[300px] lg:self-end absolute top-[80px] m-auto shadow-xl z-10"
			role="button"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					menu.open = false;
					enableScroll();
				}
			}}
		>
			<Calendar monthNumber={data.monthNumber} year={data.currentYear} />
			{#if isLoggedIn}
				<a
					href="/create-book"
					onclick={() => closeMenuAndEnableScroll()}
					class="bg-teal-950 fira-mono-regular rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md mt-4"
				>
					ADD BOOK
				</a>
			{/if}
		</div>
	</nav>
	{#if menu.open}
		<div
			class="flex flex-col items-center justify-center col-start-1 col-end-7 row-span-6 bg-teal-950 opacity-55 lg:opacity-25 w-full h-dvh min-w-screen absolute top-0 left-0 z-5"
			onclick={() => closeMenuAndEnableScroll()}
			aria-roledescription="overlay"
			role="button"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					menu.open = false;
					enableScroll();
				}
			}}
		></div>
	{/if}
	{#if isLoggedIn}
		<main
			class="{gridSize.small
				? 'alt-grid'
				: 'main-grid'} flex flex-col lg:grid grid-cols-6 lg:gap-4 gap-10 m-4 mx-6 lg:mx-12 text-white fira-mono-regular relative"
		>
			{#if navigating.to}
				<div class="flex flex-col items-center justify-center col-start-1 col-end-7 row-span-3">
					<Diamonds color="white" unit="px" size="150" />
				</div>
			{:else}
				{@render children?.()}
			{/if}
		</main>
	{:else}
		<div
			class="min-w-1/3 bg-teal-800 flex flex-col gap-4 justify-center items-center rounded-lg p-4 shadow-md"
		>
			<p class="text-center">Not logged in.</p>
		</div>
	{/if}
	<footer
		class="w-full flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-4 pt-4 pb-6 lg:py-6 text-white fira-mono-regular mt-4 lg:mt-8 self-end"
	>
		<p>Copyrights Arden R.H. 2025</p>
		<button class="opacity-40" tabindex="-1">Admin Login</button>
	</footer>
</div>

<style>
	.main-grid {
		grid-template-rows: repeat(5, minmax(0, 250px));
	}

	.alt-grid {
		grid-template-rows: repeat(1, minmax(0, 250px));
	}

	@media (min-width: 1024px) {
		.main-grid {
			grid-template-rows: repeat(5, minmax(0, 200px));
		}

		.alt-grid {
			grid-template-rows: repeat(1, minmax(0, 200px));
		}
	}

	@media (min-width: 1280px) {
		.main-grid {
			grid-template-rows: repeat(5, minmax(0, 225px));
		}

		.alt-grid {
			grid-template-rows: repeat(1, minmax(0, 225px));
		}
	}
</style>

<script lang="ts">
	import { navigating, page } from '$app/state';
	import '../app.css';

	// Components
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import LogotypeIcon from '$lib/components/LogotypeIcon.svelte';
	import { Diamonds } from 'svelte-loading-spinners';

	import { currentParams, menu, activeState } from '../states.svelte';

	import {
		closeMenuAndEnableScroll,
		enableScroll,
		disableScrollFunction
	} from '$lib/functions/scrollFunctions';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

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

<svelte:head>
	<title>{page.data.metaData.title}</title>
	<meta property="og:type" content="website" />

	<meta name="description" content={page.data.metaData.description} />
	<meta name="author" content="Arden Haldorson" />

	<!-- Open Graph -->
	<meta property="og:title" content={page.data.metaData.title} />
	<meta property="og:description" content={page.data.metaData.description} />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:url" content={page.data.metaData.url} />
</svelte:head>

<div class="flex flex-col justify-between items-center h-dvh min-h-dvh">
	<nav class="text-white p-4 lg:mt-2 flex flex-col gap-4 relative w-full">
		<div class="flex justify-between items-center xl:mx-4">
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
			<div class="flex gap-1 lg:gap-1.5 items-center">
				<a
					href="https://github.com/arden-rh/arden-reads"
					target="_blank"
					rel="noreferrer"
					class="pr-1"
					aria-label="Link to Github"
				>
					<Icon iconName="github" hover />
				</a>
				<button
					onclick={() => openMenu()}
					class="cursor-pointer focus-visible:p-0"
					aria-label="Open Calendar Menu"
				>
					<Icon iconName="calendar" hover />
				</button>
			</div>
		</div>
		<div
			class="{menu.open
				? 'flex'
				: 'hidden'} flex-col bg-teal-900 p-4 rounded-lg w-[92%] lg:max-w-[325px] lg:self-end absolute top-[80px] m-auto shadow-xl z-10"
			role="dialog"
			aria-roledescription="menu"
			aria-modal="true"
			aria-labelledby="menu-heading"
			tabindex="-1"
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					menu.open = false;
					enableScroll();
				}
			}}
		>
			<h2 id="menu-heading" class="sr-only">Main Manu: Calendar</h2>
			<Calendar monthNumber={data.currentMonthNum} year={data.currentYear} />
			{#if activeState.loggedIn}
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
			class="flex flex-col items-center justify-center col-start-1 col-end-7 row-span-6 bg-teal-950 opacity-55 lg:opacity-25 w-full h-dvh max-w-dvw absolute top-0 left-0 z-5"
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
	<main
		class="{page.status === 404
			? 'alt-grid'
			: 'main-grid'} flex flex-col lg:grid flex-grow grid-cols-6 lg:gap-4 gap-10 px-4 pt-6 lg:px-6 lg:pt-2 text-white fira-mono-regular relative w-full lg:min-w-[500px] xl:max-w-[1500px]"
	>
		{#if navigating.to}
			<div class="flex flex-col items-center justify-center col-start-1 col-end-7 row-span-3 h-full">
				<Diamonds color="white" unit="px" size="150" />
			</div>
		{:else}
			{@render children?.()}
		{/if}
	</main>
	<footer
		class="w-full min-h-[130px] lg:min-h-[100px] h-fit flex flex-col lg:flex-row justify-center items-center text-center gap-2 lg:gap-4 pt-4 pb-6 px-4.5 lg:py-6 text-white fira-mono-regular mt-4 lg:mt-8 self-end"
	>
		<p><span class="block lg:inline">Copyrights Arden R.H. 2025</span> All rights reserved.</p>
		<ButtonLink
			title="Admin Login"
			linkName="/login"
			theme="secondary"
			typeOfLink="admin"
			className="py-1.5"
			/>
	</footer>
</div>

<style>
	.main-grid {
		grid-template-rows: repeat(5, minmax(0, 250px));
	}

	.alt-grid {
		grid-template-rows: auto;
		height: 100%;
		min-height: fit-content;
	}

	@media (min-width: 1024px) {
		.main-grid {
			grid-template-rows: repeat(5, minmax(0, 200px));
		}
	}

	@media (min-width: 1280px) {
		.main-grid {
			grid-template-rows: repeat(5, minmax(0, 225px));
		}
	}
</style>

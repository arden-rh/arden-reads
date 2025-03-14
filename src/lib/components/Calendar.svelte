<script lang="ts">
	import { months } from '$lib/data/months';
	import { closeMenuAndEnableScroll, enableScroll } from '$lib/functions/scrollFunctions';
	import { activeState, currentParams, menu } from '../../states.svelte';
	
	interface Props {
		monthNumber: number;
		year: number;
	};

	let { monthNumber, year }: Props = $props();

	const years = [2024, 2025];

	let linkToMonthPage: string = $state('');

	function handleYearClick(year: number) {
		menu.activeYear = year;
	};

	function createCorrectLink(month: string) {
		currentParams.month = month;
		activeState.month = month;
		linkToMonthPage = `/${menu.activeYear}/${month}`;
		menu.open = false;
		enableScroll();
	};

	function resetParams() {
		currentParams.month = undefined;
		currentParams.year = undefined;
		menu.open = false;
		enableScroll();
	};
	

	if (!currentParams.year) {
		menu.activeYear = year;
	} else {
		menu.activeYear = currentParams.year;
	}

	$inspect(console.log('currentParams', currentParams));
	$inspect(console.log('menu', menu));
	
</script>

<div class="fira-mono-regular w-full">
	<div class="flex pb-1 mb-2 fira-mono-medium justify-between text-lg">
		<a href="/" onclick={() => resetParams()} class="rounded-lg p-1 px-2 bg-teal-900">HOME</a>
		<div class="flex gap-2 justify-end">
			{#each years as year}
				<button
					class="{year === menu.activeYear ? 'bg-teal-700' : 'bg-teal-900'} rounded-lg p-1 px-2 cursor-pointer"
					onclick={() => handleYearClick(year)}>{year}</button
				>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<a
			class="rounded-lg p-2 text-center tracking-widest shadow-md hover:bg-teal-600
			{currentParams.year === menu.activeYear && currentParams.month === undefined
				? 'bg-teal-700'
				: 'bg-teal-950'}"
			href="/{menu.activeYear}"
			onclick={closeMenuAndEnableScroll}>
			SUMMARY
			</a>
		<div class="grid grid-cols-3 gap-2">
			{#each months as month}
				{#if menu.activeYear < year}
					<a
						href={linkToMonthPage}
						onclick={() => createCorrectLink(month.name)}
						class="rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md hover:bg-teal-600
						{currentParams.month === month.name && currentParams.year === menu.activeYear
							? 'bg-teal-700'
							: 'bg-teal-950'}"
					>
						{month.abr}
					</a>
				{:else if month.number <= monthNumber && menu.activeYear === year}
					<a
						href={linkToMonthPage}
						onclick={() => createCorrectLink(month.name)}
						class="rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md
						{currentParams.month === month.name && currentParams.year === menu.activeYear
							? 'bg-teal-700'
							: 'bg-teal-950'}"
					>
						{month.abr}
					</a>
				{:else}
					<div
						class="rounded-lg p-2 bg-teal-900 flex justify-center items-center tracking-wide text-gray-300"
					>
						{month.abr}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

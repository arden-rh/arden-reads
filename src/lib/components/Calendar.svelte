<script lang="ts">
	import { months } from '$lib/data/months';
	import { closeMenuAndEnableScroll, enableScroll } from '$lib/functions/scrollFunctions';
	import { currentParams, menu } from '../../states.svelte';

	interface Props {
		monthNumber: number;
		year: number;
	}

	let { monthNumber, year }: Props = $props();

	const years = [2024, 2025];

	if (!currentParams.month) {
		currentParams.month = months[monthNumber - 1].name;
	};

	function handleYearClick(year: number) {
		menu.activeYear = year;
	};

	function resetParams() {
		currentParams.month = undefined;
		currentParams.year = undefined;
		menu.open = false;
		enableScroll();
	};

</script>

<div class="fira-mono-regular w-full">
	<div class="flex pb-1 mb-2 fira-mono-medium justify-between text-lg">
		<a href="/" onclick={() => resetParams()} class="rounded-lg p-1 px-2 bg-teal-900 hover:bg-teal-600">HOME</a>
		<div class="flex gap-2 justify-end">
			{#each years as year}
				<button
					class="{year === menu.activeYear
						? 'bg-teal-700'
						: 'bg-teal-900 hover:bg-teal-600 cursor-pointer'} rounded-lg p-1 px-2"
					onclick={() => handleYearClick(year)}>{year}</button
				>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<a
			class="rounded-lg p-2 text-center tracking-widest shadow-md 
			{currentParams.year === menu.activeYear && currentParams.month === undefined
				? 'bg-teal-700 cursor-default'
				: 'bg-teal-950 hover:bg-teal-600'}"
			href="/{menu.activeYear}"
			onclick={closeMenuAndEnableScroll}
			data-sveltekit-preload-data="tap"
		>
			SUMMARY
		</a>
		<div class="grid grid-cols-3 gap-2">
			{#each months as month}
				{#if menu.activeYear && menu.activeYear < year}
					<a
						href="/{menu.activeYear}/{month.name}"
						onclick={closeMenuAndEnableScroll}
						class="btn-basic
						{currentParams.month === month.name && currentParams.year === menu.activeYear
							? 'bg-teal-700 cursor-default'
							: 'bg-teal-950 hover:bg-teal-600'}"
						data-sveltekit-preload-data="tap"
					>
						{month.abr}
					</a>
				{:else if month.number <= monthNumber && menu.activeYear === year}
					<a
						href="/{menu.activeYear}/{month.name}"
						onclick={closeMenuAndEnableScroll}
						class="btn-basic
						{currentParams.month === month.name && currentParams.year === menu.activeYear
							? 'bg-teal-700 cursor-default'
							: 'bg-teal-950 hover:bg-teal-600'}"
						data-sveltekit-preload-data="tap"
					>
						{month.abr}
					</a>
				{:else}
					<div
						class="btn-basic bg-teal-900 text-gray-300 shadow-none"
					>
						{month.abr}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

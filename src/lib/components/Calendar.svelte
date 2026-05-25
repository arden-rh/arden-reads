<script lang="ts">
	import { months } from '$lib/data/months';
	import { enableScroll } from '$lib/functions/scrollFunctions';
	import { getAppContext } from '$lib/appContext.svelte';
	import { page } from '$app/state';

	import Button from './Button.svelte';
	import ButtonLink from './ButtonLink.svelte';

	interface Props {
		monthNumber: number;
		year: number;
		amountOfBooksCurrentMonth: number;
		currentYear: number;
	}

	let { monthNumber, year, amountOfBooksCurrentMonth, currentYear }: Props = $props();

	const { menu } = getAppContext();

	const yearButtons = [
		{ year: 2024, value: '24' },
		{ year: 2025, value: '25' },
		{ year: 2026, value: '26' }
	];

	function handleYearClick(year: number) {
		menu.activeYear = year;
	}

	function closeMenuAndEnableScroll() {
		menu.open = false;
		enableScroll();
	}

	function resetParams() {
		menu.activeYear = currentYear;
		year = currentYear;
		menu.open = false;
		enableScroll();
	}
</script>

<div class="fira-mono-regular w-full">
	<div class="flex pb-1 mb-2 justify-between text-lg">
		<div class="flex gap-0.5 justify-start items-center lg:text-[1rem]">
			<ButtonLink
				title="HOME"
				linkName="/"
				theme="secondary"
				className="p-1 px-1.5"
				onClick={() => resetParams()}
				typeOfLink="internal"
			/>
			<ButtonLink
				title="ABOUT"
				linkName="/about"
				theme="secondary"
				className="p-1 px-1.5"
				onClick={() => resetParams()}
				typeOfLink="internal"
			/>
		</div>
		<div class="flex gap-2 justify-end fira-mono-medium">
			{#each yearButtons as yearButton (yearButton.value)}
				<Button
					title={yearButton.value}
					theme="teritary"
					active={yearButton.year === menu.activeYear}
					className="p-1 px-2"
					onClick={() => handleYearClick(yearButton.year)}
				/>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<ButtonLink
			title="SUMMARY"
			linkName="/{menu.activeYear}"
			theme="primary"
			active={Number(page.params.year) === menu.activeYear && !page.params.month}
			className="tracking-widest"
			onClick={closeMenuAndEnableScroll}
			typeOfLink="internal"
		/>
		<div class="grid grid-cols-3 gap-2">
			{#each months as month (month.name)}
				{#if menu.activeYear && menu.activeYear < year}
					<ButtonLink
						title={month.abr}
						linkName="/{menu.activeYear}/{month.name}"
						theme="primary"
						active={page.params.month === month.name && Number(page.params.year) === menu.activeYear}
						onClick={closeMenuAndEnableScroll}
						typeOfLink="internal"
					/>
				{:else if month.number <= monthNumber && menu.activeYear === year}
					<ButtonLink
						title={month.abr}
						linkName="/{menu.activeYear}/{month.name}"
						theme="primary"
						active={page.params.month === month.name && Number(page.params.year) === menu.activeYear}
						disabled={amountOfBooksCurrentMonth === 0 && monthNumber === month.number}
						onClick={closeMenuAndEnableScroll}
						typeOfLink="internal"
					/>
				{:else}
					<div class="btn-basic bg-teal-900 text-gray-300 shadow-none">
						{month.abr}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

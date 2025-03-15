<script lang="ts">
	import type { Book } from '$lib/types/book.types';

	// Components
	import MonthStatistics from './MonthStatistics.svelte';
	import GenreChart from './GenreChart.svelte';
	import PagesChart from './PagesChart.svelte';
	import FormatChart from './FormatChart.svelte';
	import ListBox from './ListBox.svelte';

	interface Props {
		favouriteBookTitle?: string;
		monthBooks: Book[];
		amountOfUniqueAuthors: number;
		authors: string[];
	}

	let { monthBooks, favouriteBookTitle, authors, amountOfUniqueAuthors }: Props = $props();

	const buttonTitles = ['Books', 'Authors'];
	const books = monthBooks.map((book) => book.title);
	let activeButton: number | null = $state(null);
	let desktopInfoBox = $state('hidden');
	let arrayOfItems: string[] = $state([]);
	let header = $state('');
	let shortListTitles = $state(false);

	const handleButtonClick = (i: number, title: string) => {
		if (activeButton === i) {
			activeButton = null;
			desktopInfoBox = 'hidden';
			return;
		}

		activeButton = i;
		desktopInfoBox = 'hidden lg:flex';

		const mappings: Record<string, { array: string[]; header: string }> = {
			books: { array: books, header: 'Books' },
			authors: { array: authors, header: 'Authors' }
		};

		const { array, header: newHeader } = mappings[title.toLowerCase()];
		arrayOfItems = array;
		header = newHeader;

		if (header !== 'Books') {
			shortListTitles = true;
		} else {
			shortListTitles = false;
		}
	};
</script>

<section
	class="col-start-1 col-end-7 {favouriteBookTitle
		? 'row-span-2'
		: 'row-span-1 pt-6'} flex flex-col justify-center lg:justify-between xl:justify-evenly items-center xl:items-end gap-8 xl:gap-6"
>
	{#if favouriteBookTitle}
		<div class="flex flex-col-reverse lg:flex-row items-end justify-center w-full gap-8 lg:gap-6">
			<MonthStatistics amountOfBooks={monthBooks.length} {amountOfUniqueAuthors} />
			<div
				class="flex items-end justify-start gap-2 lg:gap-4 w-full xl:w-fit xl:pt-6
					{monthBooks.length > 10 ? 'lg:w-4/6' : 'lg:w-fit'}"
			>
				{#each books as book}
					<div
						class="bg-teal-800 rounded-xs text-sm w-[30px] lg:w-[45px] min-w-[10px]"
						style="height: calc({book.length}ch / 2);"
					></div>
				{/each}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center w-full lg:mb-4 lg:mt-2">
			<h2 class="flex flex-col gap-2 lg:gap-3 items-center justify-center text-center">
				<span class="rozha-one-regular text-3xl lg:text-4xl xl:text-5xl text-teal-200"
					>Favourite Book of the Month:</span
				>
				<span class="fira-mono-regular text-xl lg:text-2xl">{favouriteBookTitle}</span>
			</h2>
		</div>
	{:else}
		<div class="flex flex-col-reverse lg:flex-row items-end justify-center w-full gap-8">
			<MonthStatistics amountOfBooks={monthBooks.length} {amountOfUniqueAuthors} />
			<div
				class="flex items-end justify-start gap-2 lg:gap-4 w-full xl:w-fit xl:pt-6
					{monthBooks.length > 10 ? 'lg:w-4/6' : 'lg:w-fit'}"
			>
				{#each books as book}
					<div
						class="bg-teal-800 rounded-xs text-sm w-[30px] lg:w-[45px] min-w-[10px]"
						style="height: calc({book.length}ch / 2);"
					></div>
				{/each}
			</div>
		</div>
	{/if}
</section>
<section
	class="col-start-1 col-end-7 row-span-2 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6"
>
	<GenreChart listOfBooks={monthBooks} />

	<div
		class="w-full lg:max-w-[275px] xl:max-w-[400px] xl:min-w-[350px] bg-teal-900 rounded-lg pt-6 px-4 lg:px-2 xl:px-0 pb-0 lg:pb-2 xl:pb-4 grow"
	>
		<PagesChart listOfBooks={monthBooks} />
	</div>
	<FormatChart listOfBooks={monthBooks} />
</section>
<section
	class="col-start-1 col-end-7 {favouriteBookTitle
		? 'row-start-7 row-end-9'
		: 'row-start-5 row-end-6'} flex flex-col lg:flex-row items-center lg:items-start justify-center xl:mt-4 gap-4 lg:gap-2 xl:gap-4 bg-teal-900 rounded-lg py-6 px-4 lg:px-2 xl:px-0 lg:py-4 lg:h-fit"
>
	<h2 class="flex fira-mono-medium text-2xl lg:w-1/5 xl:w-fit items-start lg:ml-2 lg:mt-5">
		List of all:
	</h2>
	<div class="flex flex-col w-full lg:w-4/5 xl:w-5/6">
		<div class="w-full xl:w-4/5 flex flex-col lg:flex-row gap-5">
			{#each buttonTitles as title, i}
				<button
					id="button-{i}"
					class="h-fit p-6 rounded-lg w-full lg:w-1/5 text-center text-xl fira-mono-medium text-teal-950 shadow-xl focus-visible:ring-teal-50 focus-visible:ring-3 hover:bg-teal-500 focus-visible:bg-teal-500
							{activeButton === i ? 'bg-teal-500' : 'bg-teal-300'}"
					onclick={() => handleButtonClick(i, title)}
				>
					{title}
				</button>
				{#if activeButton === i}
					<div class="w-full xl:w-4/5 flex justify-center lg:hidden">
						<ListBox {arrayOfItems} {header} />
					</div>
				{/if}
			{/each}
		</div>
		<div class="w-full flex justify-center {desktopInfoBox}">
			<ListBox {arrayOfItems} {header} shortTitles={shortListTitles} />
		</div>
	</div>
</section>

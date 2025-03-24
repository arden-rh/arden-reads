<script lang="ts">
	// Types
	import type { PageData } from './$types';
	import type { Book } from '$lib/types/book.types';

	// Components
	import AuthorChart from '$lib/components/AuthorChart.svelte';
	import BookChart from '$lib/components/BookChart.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormatChart from '$lib/components/FormatChart.svelte';
	import GenreChart from '$lib/components/GenreChart.svelte';
	import ListBox from '$lib/components/ListBox.svelte';
	import StatNumberBlock from '$lib/components/StatNumberBlock.svelte';

	import { currentParams } from '../../states.svelte';

	let { data }: { data: PageData } = $props();

	const {
		totalPagesReadYear: totalPagesRead,
		minutesListenedYear: minutesListened,
		yearAmountOfGenres: amountOfGenres,
		yearAmountOfFormats: amountOfFormats,
		yearAmountOfUniqueAuthors: amountOfUniqueAuthors,
		yearBooks,
		yearAuthors: authors
	} = data.yearStats;

	const year = data.year;
	const amountOfBooks = yearBooks.length;
	const buttonTitles = ['Books', 'Authors'];

	let activeButton: number | null = $state(null);
	let desktopInfoBox = $state('hidden');
	let arrayOfItems: Book[] | string[] = $state([]);
	let header = $state('');

	const handleButtonClick = (i: number, title: string) => {
		if (activeButton === i) {
			activeButton = null;
			desktopInfoBox = 'hidden';
			return;
		}

		activeButton = i;
		desktopInfoBox = 'hidden lg:flex';

		const mappings: Record<string, { array: Book[] | string[]; header: string }> = {
			books: { array: yearBooks, header: 'Books' },
			authors: { array: authors, header: 'Authors' }
		};

		const { array, header: newHeader } = mappings[title.toLowerCase()];
		arrayOfItems = array;
		header = newHeader;
	};
</script>

{#key currentParams.year}
	<section
		class="col-start-1 col-end-7 row-start-1 row-end-3 flex flex-col lg:flex-row-reverse justify-center lg:justify-between gap-2 lg:gap-6 xl:gap-4 items-center"
	>
		<div class="flex flex-col items-center justify-center xl:w-full">
			<h1
				class="text-[8rem] lg:text-[12rem] xl:text-[19rem] flex flex-col items-center justify-center fugaz-one-regular text-center text-teal-200 mt-5 lg:mt-0"
			>
				{year}
			</h1>
		</div>
		<div class="flex flex-col items-center justify-center lg:max-w-[400px] xl:min-w-[460px]">
			<StatNumberBlock
				{amountOfBooks}
				{totalPagesRead}
				{minutesListened}
				{amountOfGenres}
				{amountOfFormats}
				{amountOfUniqueAuthors}
				subTitle="Yearly Statistics"
				page="year"
			/>
		</div>
	</section>
	<section
		class="col-start-1 col-end-7 row-span-2 flex justify-center items-center h-full xl:h-fit"
	>
		<div
			class="w-full flex flex-col lg:flex-row gap-4 lg:gap-0 h-fit bg-teal-900 rounded-lg pt-6 px-4 pb-0 lg:pb-6"
		>
			<BookChart listOfBooks={yearBooks} />
			<AuthorChart listOfBooks={yearBooks} />
		</div>
	</section>
	<section
		class="col-start-1 col-end-7 row-span-2 flex flex-col lg:flex-row gap-8 items-center justify-center"
	>
		<GenreChart listOfBooks={yearBooks} />
		<div class="h-1 lg:h-5/6 xl:h-full w-full lg:w-1 xl:w-2 bg-white"></div>
		<FormatChart listOfBooks={yearBooks} />
	</section>
	<section
		class="col-start-1 col-end-7 row-start-7 row-end-9 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:my-8 xl:mt-12 gap-4 lg:gap-2 xl:gap-4 bg-teal-900 rounded-lg py-6 px-4 lg:px-2 xl:px-0 lg:py-4"
	>
		<h2 class="flex fira-mono-medium text-2xl lg:w-1/5 xl:w-fit items-start lg:ml-2 lg:mt-5">
			List of all:
		</h2>
		<div class="flex flex-col w-full lg:w-4/5 xl:w-5/6">
			<div class="w-full xl:w-4/5 flex flex-col lg:flex-row gap-5">
				{#each buttonTitles as title, i}
					<Button
						id={i.toString()}
						{title}
						theme="primary"
						onClick={() => handleButtonClick(i, title)}
						active={activeButton === i}
						className="h-fit w-full lg:w-1/5 p-4 lg:p-6 lg:text-xl fira-mono-medium shadow-xl focus-visible:ring-3 cursor-pointer"
					/>
					{#if activeButton === i}
						<div class="w-full xl:w-4/5 flex justify-center lg:hidden">
							{#key activeButton}
								<ListBox {arrayOfItems} {header} />
							{/key}
						</div>
					{/if}
				{/each}
			</div>
			<div class="w-full flex justify-center {desktopInfoBox}">
				{#key activeButton}
					<ListBox {arrayOfItems} {header} />
				{/key}
			</div>
		</div>
	</section>
{/key}

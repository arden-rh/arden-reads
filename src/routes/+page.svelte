<script lang="ts">
	// Types
	import type { LayoutData } from './$types';

	// Components
	import BookIllustration from '$lib/components/BookIllustration.svelte';
	import IntroText from '$lib/components/IntroText.svelte';
	import MonthlyBooks from '$lib/components/MonthlyBooks.svelte';
	import PillBox from '$lib/components/PillBox.svelte';
	import StatNumberBlock from '$lib/components/StatNumberBlock.svelte';
	import YearlyBooks from '$lib/components/YearlyBooks.svelte';

	let { data }: { data: LayoutData } = $props();

	const {
		amountOfFormats: allTimeAmountOfFormats,
		amountOfGenres: allTimeAmountOfGenres,
		allBooks,
		amountOfUniqueAuthors: allTimeAuthors,
		minutesListened: allTimeMinutes,
		totalPagesRead: allTimePages,
		genres: allTimeGenres,
		formats: allTimeFormats
	} = data.allTimeStats;

	const { yearBooks } = data.yearStats;

	let amountOfFormats = $state(allTimeAmountOfFormats | 0);
	let amountOfGenres = $state(allTimeAmountOfGenres | 0);
	let amountOfBooks = $state(allBooks.length | 0);
	let amountOfUniqueAuthors: number | undefined = $state(allTimeAuthors | 0);
	let numberOfBooksYear: number = $state(yearBooks.length);
	let numberOfBooksCurrentMonth: number | undefined = $state(data.currentMonthBooks.items.length);
	let numberOfBooksPreviousMonth: number | undefined = $state(data.previousMonthBooks.items.length);
	let minutesListened = $state(allTimeMinutes);
	let totalPagesRead = $state(allTimePages);
	let formats = $state(allTimeFormats);
	let genres = $state(allTimeGenres);

	const latestBook = data.latestBook;

	let { day, previousMonthString, previousMonthNum, currentMonthString, currentMonthNum, year } =
		data.dateInfo;

	let previousMonth = previousMonthString;
	let previousMonthNumber = previousMonthNum;
	let currentMonth = currentMonthString;
	let currentMonthNumber = currentMonthNum;
	
</script>

<section
	class="col-start-1 col-end-4 row-start-1 row-end-3 flex flex-col justify-center items-center lg:items-end px-2 lg:p-4 xl:pl-6"
>
	<h1
		class="text-[6.25rem] leading-[5.5rem] lg:text-[4rem] lg:leading-[3.5rem] xl:text-[7rem] xl:leading-[6rem] rozha-one-regular text-center w-full lg:text-left mb-3 lg:mb-0"
	>
		Arden Reads
	</h1>
	<IntroText />
</section>
<div
	class="col-start-1 col-end-4 row-start-3 row-end-5 flex flex-col justify-center items-center gap-6 xl:gap-0"
>
	<MonthlyBooks
		{currentMonth}
		{currentMonthNumber}
		{numberOfBooksCurrentMonth}
		{previousMonth}
		{previousMonthNumber}
		{numberOfBooksPreviousMonth}
		{day}
	/>
	<YearlyBooks {year} {numberOfBooksYear} />
</div>
<div
	class="flex flex-col-reverse lg:flex-row gap-6 lg:gap-0 justify-center items-center xl:self-end col-start-4 col-end-7 row-start-1 row-end-3 mb-4 lg:mb-0"
>
	<BookIllustration />
	<div class="flex flex-col items-center justify-center lg:ml-[-2rem] mb-4 lg:mb-0">
		<h2 class="flex flex-col items-center justify-center text-center">
			<span
				class="rozha-one-regular text-[2.4rem] lg:text-2xl lg:leading-7 xl:text-4xl xl:leading-11 tracking-wide text-teal-200"
			>
				Latest book read
			</span>
			<span class="fira-mono-regular text-[1.15rem] lg:text-[0.85rem] xl:text-[1.15rem]"
				>{latestBook.title}</span
			>
		</h2>
	</div>
</div>
<section
	class="col-start-4 col-end-7 row-start-3 row-end-5 flex flex-col justify-center items-center gap-6 xl:gap-4"
>
	<StatNumberBlock
		{year}
		{totalPagesRead}
		{minutesListened}
		{amountOfGenres}
		{amountOfFormats}
		{amountOfUniqueAuthors}
		{amountOfBooks}
		title="All time reading"
		subTitle="in numbers"
		page="start"
	/>
</section>
<section class="col-start-1 col-end-4 row-span-1 flex flex-col items-center justify-start">
	<PillBox arrayOfPills={genres} header="Genres Explored" />
</section>
<section class="col-start-4 col-end-7 row-span-1 flex flex-col items-center justify-start">
	<PillBox arrayOfPills={formats} header="Different Formats" />
</section>

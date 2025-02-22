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

	const { amountOfFormats: allTimeAmountOfFormats, amountOfGenres: allTimeAmountOfGenres, allBooks, amountOfUniqueAuthors: allTimeAuthors, minutesListened: allTimeMinutes, totalPagesRead: allTimePages, genres: allTimeGenres, formats: allTimeFormats } = data.allTimeStats;
	const { yearBooks } = data.yearStats;


	let amountOfFormats = $state(allTimeAmountOfFormats | 0);
	let amountOfGenres = $state(allTimeAmountOfGenres | 0);
	let amountOfBooks = $state(allBooks.length | 0);
	let amountOfUniqueAuthors: number | undefined = $state(allTimeAuthors | 0);
	let numberOfBooksYear: number = $state(yearBooks.length);
	let numberOfBooksMonth: number | undefined = $state(data.monthBooks.items.length);
	let minutesListened = $state(allTimeMinutes);
	let totalPagesRead = $state(allTimePages);
	let formats = $state(allTimeFormats);
	let genres = $state(allTimeGenres);

	let day = data.day;
	let month = data.monthString;
	let year = data.year;
	let monthNumber = data.monthNumber;

</script>

<section
	class="col-start-1 col-end-4 row-start-1 row-end-3 flex flex-col justify-center items-center lg:items-end px-4 lg:p-4 xl:pl-6"
>
	<h1
		class="text-[6.25rem] leading-[5.5rem] lg:text-[4rem] lg:leading-[3.5rem] xl:text-[7rem] xl:leading-[6rem] rozha-one-regular text-center w-full lg:text-left mb-3 lg:mb-0"
	>
		Arden Reads
	</h1>
	<IntroText />
</section>
<section
	class="col-start-1 col-end-4 row-start-3 row-end-5 flex flex-col justify-center items-center gap-6 xl:gap-0"
>
	<MonthlyBooks {month} {numberOfBooksMonth} {day} {monthNumber} />
	<YearlyBooks {year} {numberOfBooksYear} {numberOfBooksMonth} />
</section>
<div
	class="flex justify-center items-center xl:self-end col-start-4 col-end-7 row-start-1 row-end-3 my-4 lg:my-0"
>
	<BookIllustration />
</div>
<section
	class="col-start-4 col-end-7 row-start-3 row-end-5 flex flex-col justify-center items-center text-white"
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

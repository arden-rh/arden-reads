<script lang="ts">
	// Types
	import type { PageData } from './$types';

	// Components
	import MonthPageHeader from '$lib/components/MonthPageHeader.svelte';
	import MonthPageContent from '$lib/components/MonthPageContent.svelte';

	import { currentParams, tryingToAccessTheFuture } from '../../../states.svelte';

	let { data }: { data: PageData } = $props();

	const { amountOfUniqueAuthors, authors } = data.monthBookInfo;

	let monthBooks = $state(data.monthBookInfo.books);
	let favouriteBookTitle: string | undefined = $state('');

	if (data.monthBookInfo.favouriteBook) {
		favouriteBookTitle = data.monthBookInfo.favouriteBook.title;
		console.log('favouriteBookTitle', favouriteBookTitle);
	} else {
		favouriteBookTitle = undefined;
	}

</script>

<MonthPageHeader month={currentParams.month} tryingToAccessTheFuture={tryingToAccessTheFuture.futureDate} />

<MonthPageContent
	{authors}
	{monthBooks}
	{favouriteBookTitle}
	{amountOfUniqueAuthors}
	tryingToAccessTheFuture={tryingToAccessTheFuture.futureDate}
	currentYear={data.currentYear}
/>

<script lang="ts">
	// Types
	import type { PageData } from './$types';

	// Components
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import MonthPageContent from '$lib/components/MonthPageContent.svelte';
	import MonthPageHeader from '$lib/components/MonthPageHeader.svelte';

	import { currentParams } from '../../../states.svelte';
	import AltMonthPageContent from '$lib/components/AltMonthPageContent.svelte';

	let { data }: { data: PageData } = $props();

	const { amountOfUniqueAuthors, authors } = data.monthBookInfo;

	let monthBooks = $state(data.monthBookInfo.books);
	let favouriteBookTitle: string | undefined = $state('');

	if (data.monthBookInfo.favouriteBook) {
		favouriteBookTitle = data.monthBookInfo.favouriteBook.title;
	} else {
		favouriteBookTitle = undefined;
	}
</script>

{#if data.futureDate}
	<AltMonthPageContent
		currentYear={data.currentYear.toString()}
		title="Trying to predict the future?"
		isThisTheFuture
	/>
{:else}
	<MonthPageHeader month={currentParams.month} />
	{#if monthBooks.length === 0}
		<AltMonthPageContent currentYear={data.currentYear.toString()} title="Hmm..." isThisTheFuture={false} />
	{:else}
		<MonthPageContent {authors} {monthBooks} {favouriteBookTitle} {amountOfUniqueAuthors} />
	{/if}
{/if}

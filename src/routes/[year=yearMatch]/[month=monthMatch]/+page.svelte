<script lang="ts">
	// Types
	import type { PageData } from './$types';

	// Components
	import MonthPageContent from '$lib/components/MonthPageContent.svelte';
	import MonthPageHeading from '$lib/components/MonthPageHeading.svelte';

	import { currentParams } from '../../../states.svelte';
	import AltMonthPageContent from '$lib/components/AltMonthPageContent.svelte';

	let { data }: { data: PageData } = $props();

	const { amountOfUniqueAuthors, authors } = $derived(data.monthBookInfo);

	let monthBooks = $derived(data.monthBookInfo.books);
    let favouriteBookTitle: string | undefined = $derived(
        data.monthBookInfo.favouriteBook?.title
    );
</script>

{#if data.futureDate}
	<AltMonthPageContent
		currentYear={data.dateInfo.currentYear.toString()}
		title="Trying to predict the future?"
		isThisTheFuture
	/>
{:else}
	<MonthPageHeading month={currentParams.month} />
	{#if monthBooks.length === 0}
		<AltMonthPageContent
			currentYear={data.dateInfo.currentYear.toString()}
			title="Hmm..."
			isThisTheFuture={false}
		/>
	{:else}
		<MonthPageContent {authors} {monthBooks} {favouriteBookTitle} {amountOfUniqueAuthors} />
	{/if}
{/if}

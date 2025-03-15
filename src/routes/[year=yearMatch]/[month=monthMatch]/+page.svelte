<script lang="ts">
	// Types
	import type { PageData } from './$types';

	// Components
	import MonthPageHeader from '$lib/components/MonthPageHeader.svelte';
	import MonthPageContent from '$lib/components/MonthPageContent.svelte';

	import { currentParams } from '../../../states.svelte';

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
	<section
		class="col-start-1 col-end-7 row-span-2 flex flex-col justify-center items-center gap-6 h-fit mt-6"
	>
		<h2 class="rozha-one-regular text-3xl lg:text-4xl xl:text-5xl text-teal-200 text-center">
			Trying to predict the future?
		</h2>
		<p class="text-center">Well, I haven't read any books during this month (yet) in any case.</p>
		<div class="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 items-center justify-center mt-6">
			<a
				href="/"
				class="p-4 rounded-lg w-full lg:max-w-[250px] text-center text-lg fira-mono-medium text-teal-950 shadow-xl bg-teal-300"
			>
				Return to present day
			</a>
			<a
				href="/{data.currentYear}"
				class="p-4 rounded-lg w-full lg:max-w-[300px] text-center text-lg fira-mono-medium text-teal-950 shadow-xl bg-teal-300"
			>
				Check out this year's reading so far
			</a>
		</div>
	</section>
{:else}
	<MonthPageHeader month={currentParams.month} />

	<MonthPageContent
		{authors}
		{monthBooks}
		{favouriteBookTitle}
		{amountOfUniqueAuthors}
	/>
{/if}

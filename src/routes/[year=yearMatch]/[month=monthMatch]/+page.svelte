<script lang="ts">
	// Types
	import type { PageData } from './$types';

	// Components
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import MonthPageContent from '$lib/components/MonthPageContent.svelte';
	import MonthPageHeader from '$lib/components/MonthPageHeader.svelte';

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
		<h2 class="rozha-one-regular text-3xl lg:text-4xl xl:text-5xl text-teal-200 text-center mb-2">
			Trying to predict the future?
		</h2>
		<div
			class="flex flex-col w-full lg:max-w-fit gap-4 lg:gap-4 items-center justify-center lg:bg-teal-900 lg:rounded-xl px-3 lg:p-6"
		>
			<p class="text-center text-sm lg:text-base">
				Well, I haven't read any books during this month (yet) in any case.
			</p>
			<ButtonLink
				title="Go back to home"
				linkName="/"
				theme="teritary"
				className="p-3 w-full lg:w-1/2 fira-mono-medium"
				typeOfLink="internal"
			/>

			<p class="text-center text-sm lg:text-base mt-2">Or check out this year's reading so far</p>
			<ButtonLink
				title="Reading done in {data.currentYear.toString()}"
				linkName="/{data.currentYear}"
				theme="teritary"
				className="p-3 w-full lg:w-1/2 fira-mono-medium"
				typeOfLink="internal"
			/>
		</div>
	</section>
{:else}
	<MonthPageHeader month={currentParams.month} />

	<MonthPageContent {authors} {monthBooks} {favouriteBookTitle} {amountOfUniqueAuthors} />
{/if}

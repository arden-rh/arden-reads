<script lang="ts">
	import { countBooksByMonth } from '$lib/functions/countBooksByMonth';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	import type { Book } from '$lib/types/book.types';

	interface Props {
		listOfBooks: Book[];
	};

	let { listOfBooks }: Props = $props();

	const booksByMonth = countBooksByMonth(listOfBooks);

</script>

<div class="chart min-h-[250px] w-full max-w-full flex flex-col items-center gap-2 lg:p-4 xl:p-8 border-b-4 lg:border-b-0 lg:border-r-4">
	<h3 class="fira-mono-medium text-xl mb-8">Books read by month</h3>
	<LinkedChart
		data={booksByMonth}
		grow
		width={250}
		height={75}
		fill="#2cd4bf"
		barMinWidth={0}
		linked="chart-link-1"
		uid="books-read-by-month"
		tabindex={0}
		title="Chart with number of books read per month"
		description="A bar chart showing the number of books read each month."
	/>
	<div class="w-full flex flex-col text-sm lg:min-h-[80px] xl:min-h-[60px]">
		<span>Month: <LinkedLabel linked="chart-link-1" /></span>
		<span>Books read: <LinkedValue uid="books-read-by-month" /></span>
	</div>
</div>

<style>
	:global(.chart svg) {
		width: 100%;
		height: auto;
	}

</style>

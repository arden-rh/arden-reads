<script lang="ts">
	import type { Book } from '$lib/types/book.types';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	interface Props {
		listOfBooks: Book[];
	}

	let { listOfBooks }: Props = $props();

	function countBooksByMonth(books: Book[]): Record<string, number> {
		const booksByMonth = books.reduce(
			(acc, book) => {
				const bookDate = new Date(book.date_read);
				const yearMonth = `${bookDate.getFullYear()}-${String(bookDate.getMonth() + 1).padStart(2, '0')}`;
				acc[yearMonth] = (acc[yearMonth] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		);

		const sortedBooksByMonth = Object.entries(booksByMonth).sort(([a], [b]) => {
			const [yearA, monthA] = a.split('-').map(Number);
			const [yearB, monthB] = b.split('-').map(Number);
			return yearA === yearB ? monthA - monthB : yearA - yearB;
		});

		return Object.fromEntries(
			sortedBooksByMonth.map(([key, value]) => {
				return [key, value];
			})
		);
	}

	const booksByMonth = countBooksByMonth(listOfBooks);

</script>

<div class="book-chart w-full flex flex-col items-center gap-2 lg:p-4 xl:p-8 border-b-4 lg:border-b-0 lg:border-r-4">
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
	/>
	<div class="w-full flex flex-col text-sm lg:min-h-[80px] xl:min-h-[60px]">
		<span>Month: <LinkedLabel linked="chart-link-1" /></span>
		<span>Books read: <LinkedValue uid="books-read-by-month" /></span>
	</div>
</div>

<style>

	.book-chart {
		min-height: 250px;
		max-width: 100%;
	}

	:global(.book-chart svg) {
		width: 100%;
		height: auto;
	}
</style>

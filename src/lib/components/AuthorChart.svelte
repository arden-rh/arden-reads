<script lang="ts">
	import type { Book } from '$lib/types/book.types';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	interface Props {
		listOfBooks: Book[];
	}

	let { listOfBooks }: Props = $props();

	function countBooksByAuthor(books: Book[]): Record<string, number> {
		const booksByAuthor = books.reduce(
			(acc, book) => {
				const author = book.author;
				acc[author] = (acc[author] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		);

		return booksByAuthor;
	}

	const booksByAuthor = countBooksByAuthor(listOfBooks);

</script>

<div class="chart w-full flex flex-col items-center gap-2 mt-4 lg:mt-0 lg:p-4 xl:p-8">
	<h3 class="fira-mono-medium text-xl mb-8">Books by author</h3>
	<LinkedChart
		data={booksByAuthor}
		grow
		width={250}
		height={75}
		fill="#2cd4bf"
		barMinWidth={0}
		linked="chart-link-3"
		uid="books-by-author"
		tabindex={0}
		title="Chart with number of books per author"
		description="A bar chart showing the number of books read by each author this year."
	/>
	<div class="w-full flex flex-col text-sm lg:min-h-[80px] xl:min-h-[60px]">
		<span>Author: <LinkedLabel linked="chart-link-3" /></span>
		<span>Books: <LinkedValue uid="books-by-author" /></span>
	</div>
</div>

<style>
	.chart {
		min-height: 250px;
		max-width: 100%;
	}

	:global(.chart svg) {
		width: 100%;
		height: auto;
	}
</style>

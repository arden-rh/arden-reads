<script lang="ts">
	import type { Book } from '$lib/types/book.types';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	interface Props {
		listOfBooks: Book[];
		bottomBorder?: boolean;
	};

	let { listOfBooks, bottomBorder }: Props = $props();

	const getPagesPerBook = (books: Book[]): Record<string, number> => {

		const booksWithPages = books.filter((book) => book.pages);

		return Object.fromEntries(
			booksWithPages.map((book) => {
				return [book.title, book.pages];
			})
		);
	};

	const pagesPerBook = getPagesPerBook(listOfBooks);

</script>

<div class="chart min-h-[250px] w-full max-w-full flex flex-col items-center justify-center gap-2 mt-4 lg:mt-0 lg:p-4 xl:p-8 {bottomBorder ? 'border-b-4 lg:border-b-0 lg:border-r-4' : ''}">
	<h3 class="fira-mono-medium text-xl mb-8">Pages per book</h3>
	<LinkedChart
		data={pagesPerBook}
		grow
		width={250}
		height={75}
		fill="#2cd4bf"
		barMinWidth={0}
		linked="chart-link-2"
		uid="pages-per-book"
		tabindex={0}
		title="Chart with number of pages per book"
		description="A bar chart showing the number of pages in each book."
	/>
	<div class="w-full flex flex-col text-sm grow lg:min-h-[80px] xl:min-h-[60px]">
		<span>Title: <LinkedLabel linked="chart-link-2" /></span>
		<span>Pages: <LinkedValue uid="pages-per-book" /></span>
	</div>
</div>

<style>
	:global(.chart svg) {
		width: 100%;
		height: auto;
	}
</style>

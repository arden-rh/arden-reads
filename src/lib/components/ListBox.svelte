<script lang="ts">
	import type { Book } from '$lib/types/book.types';
	interface Props {
		arrayOfItems: string[] | Book[];
		heading: string;
	}

	let { arrayOfItems, heading }: Props = $props();

	let shortTitles: boolean = $state(false);
	let books: Book[] = $state([]);
	let authors: string[] = $state([]);

	if (heading == 'Authors') {
		shortTitles = true;
		authors = arrayOfItems as string[];
	} else if (heading === 'Books') {
		shortTitles = false;
		books = arrayOfItems as Book[];
	}
</script>

<div class="max-w-150 lg:max-w-full flex flex-col grow lg:pt-4 lg:pb-0">
	<h3 class="fira-mono-medium text-xl xl:text-2xl mb-4 w-full text-center lg:text-left">
		{heading}
	</h3>
	<ol
		class="columns-1 lg:columns-2 gap-4 wrap-break-word
		{shortTitles ? 'lg:columns-3 xl:columns-4' : 'lg:columns-2 xl:columns-3'}"
	>
		{#if heading === 'Authors'}
			{#each authors as author, i}
				<li class="text-sm flex items-center gap-2 mb-3 lg:mr-2 xl:mr-4">
					<span class="bg-teal-700 p-2 rounded-md shrink-0 min-w-8 text-center">{i + 1}</span>
					<span class="wrap-break-word">{author}</span>
				</li>
			{/each}
		{:else if heading === 'Books'}
			{#each books as book, i}
				<li class="text-sm/tight flex items-center gap-2 mb-3 lg:mr-2">
					<span class="bg-teal-700 p-2 rounded-md shrink-0 min-w-8 text-center">{i + 1}</span>
					<span class="wrap-break-word"
						>{book.title}<span class="fira-mono-medium px-1.5 text-teal-300">—</span
						>{book.author}</span
					>
				</li>
			{/each}
		{/if}
	</ol>
</div>

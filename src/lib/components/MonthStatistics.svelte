<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		amountOfBooks: number;
		amountOfUniqueAuthors: number;
	}

	let { amountOfBooks, amountOfUniqueAuthors }: Props = $props();
</script>

<div
	class="w-full lg:max-w-[300px] bg-teal-900 rounded-lg h-fit p-6 flex flex-col gap-4 text-center"
>
	<div class="flex justify-around border-4 p-4 xl:p-6 rounded-lg">
		<div class="flex flex-col items-center">
			<Icon iconName="books" />
			<span class="ledger-regular text-4xl text-teal-200 mt-2 lg:text-3xl">{amountOfBooks}</span>
			<span class="italic text-md">{amountOfBooks > 1 ? 'books' : 'book'}</span>
		</div>
		<div class="flex flex-col items-center">
			<Icon iconName="authors" />
			<span class="ledger-regular text-4xl text-teal-200 mt-2 lg:text-3xl"
				>{amountOfUniqueAuthors}</span
			>
			<span class="italic text-md">{amountOfUniqueAuthors > 1 ? 'authors' : 'author'}</span>
		</div>
	</div>
</div>

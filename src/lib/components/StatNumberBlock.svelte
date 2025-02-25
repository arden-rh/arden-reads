<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		amountOfBooks?: number;
		amountOfFormats: number;
		amountOfGenres: number;
		amountOfUniqueAuthors: number;
		minutesListened?: number;
		page: 'year' | 'start';
		title?: string;
		subTitle?: string;
		totalPagesRead: number;
		year?: string | number;
	};

	let {
		amountOfBooks,
		amountOfFormats,
		amountOfGenres,
		amountOfUniqueAuthors,
		minutesListened,
		page,
		subTitle,
		title,
		totalPagesRead
	}: Props = $props();
	
</script>

<div
	class="{page === 'year'
		? 'year-page-wrapper'
		: ''} max-w-[600px] xl:max-w-full flex flex-col gap-4 text-center"
>
	<h2
		class="italic flex flex-col xl:flex-row items-center xl:items-baseline justify-center gap-1 xl:gap-2"
	>
		<span class="rozha-one-regular text-[2.5rem] leading-[2.5rem] xl:text-5xl'} text-teal-200"
			>{title}</span
		>
		<span class="text-xl">{subTitle}</span>
	</h2>

	<div
		class="flex flex-wrap gap-5 lg:gap-8 items-center justify-center border-4 p-8 xl:p-6 rounded-lg fira-mono-regular"
	>
		{#if amountOfBooks}
			<div class="flex flex-col items-center flex-1">
				<Icon iconName="books" />
				<span
					class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
					>{amountOfBooks}</span
				>
				<span class="italic text-md">{amountOfBooks > 1 ? 'books' : 'book'}</span>
			</div>
		{/if}
		<div class="flex flex-col items-center flex-1">
			<Icon iconName="pages" />
			<span
				class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
				>{totalPagesRead}</span
			>
			<span class="italic text-md">pages</span>
		</div>
		<div class="flex flex-col items-center flex-1">
			<Icon iconName="formats" />
			<span
				class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
				>{amountOfFormats}</span
			>
			<span class="italic text-md">{amountOfFormats > 1 ? 'formats' : 'format'}</span>
		</div>
		<div class="flex flex-col items-center flex-1">
			<Icon iconName="authors" />
			<span
				class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
				>{amountOfUniqueAuthors}</span
			>
			<span class="italic text-md">{amountOfUniqueAuthors > 1 ? 'authors' : 'author'}</span>
		</div>
		{#if minutesListened}
			<div class="flex flex-col items-center flex-1">
				<Icon iconName="headphones" />
				<span
					class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
					>{minutesListened}</span
				>
				<span class="italic text-md">minutes</span>
			</div>
		{/if}
		<div class="flex flex-col items-center flex-1">
			<Icon iconName="genres" />
			<span
				class="ledger-regular text-4xl text-teal-200 mt-2 {page === 'year' ? 'lg:text-3xl' : ''}"
				>{amountOfGenres}</span
			>
			<span class="italic text-md">{amountOfGenres > 1 ? 'genres' : 'genre'}</span>
		</div>
	</div>
</div>

<style>
	@media (min-width: 1024px) {
		.year-page-wrapper {
			@apply h-fit w-fit;
			background-color: var(--color-teal-900);
			border-radius: var(--radius-lg);
			padding: calc(var(--spacing) * 6);
			padding-top: calc(var(--spacing) * 3)
		}
	}
</style>

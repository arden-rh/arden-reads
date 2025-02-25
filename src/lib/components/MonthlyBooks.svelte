<script lang="ts">
	interface Props {
		day: number;
		month: string;
		monthNumber: number;
		numberOfBooksMonth: number;
	};

	let { day, numberOfBooksMonth, month, monthNumber }: Props = $props();

	const todaysDate = new Date();
	const todaysMonth = todaysDate.getMonth() + 1;

</script>

<div
	class="month-statistic px-2 xl:p-6 flex flex-col xl:flex-row justify-center items-center text-white"
>
	<span class="numOfBooks text-9xl xl:mr-4 text-teal-200 fugaz-one-regular">
		{numberOfBooksMonth}
	</span>
	<span class="italic flex flex-col xl:flex-row items-start xl:items-baseline">
		{#if todaysMonth > monthNumber && numberOfBooksMonth === 1}
			book read in
		{:else if todaysMonth > monthNumber && numberOfBooksMonth > 1}
			books read in
		{:else if day <= 15 && numberOfBooksMonth === 1}
			book read so far in
		{:else if day <= 15 && numberOfBooksMonth > 1}
			books read so far in
		{:else if day > 15 && numberOfBooksMonth === 1}
			book read so far in
		{:else}
			books read in
		{/if}
		<span class="text-5xl rozha-one-regular italic ml-10 xl:ml-3 mt-1 xl:mt-0 text-teal-200">
			{month}
		</span>
	</span>
</div>

<style>
	.month-statistic {
		font-size: 1.2rem;
	}
	@media (min-width: 1280px) {
		.numOfBooks {
			font-size: 12rem;
			line-height: 9rem;
		}
	}
</style>

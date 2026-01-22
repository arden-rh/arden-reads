<script lang="ts">
	import { activeState } from '../../states.svelte';
	interface Props {
		day: number;
		currentMonth: string;
		currentMonthNumber: number;
		numberOfBooksCurrentMonth: number;
		previousMonth: string;
		previousMonthNumber: number;
		numberOfBooksPreviousMonth: number;
	}

	let {
		day,
		currentMonth,
		currentMonthNumber,
		numberOfBooksCurrentMonth,
		previousMonth,
		previousMonthNumber,
		numberOfBooksPreviousMonth
	}: Props = $props();

	let month: string = $state('');
	let monthNumber: number = $state(0);
	let numberOfBooksMonth: number = $state(0);
	let bookText = $state('books read in');

	// svelte-ignore state_referenced_locally
	activeState.startPageMonthBooks = numberOfBooksCurrentMonth;

	// Determine which month to display and the corresponding number of books read
	// svelte-ignore state_referenced_locally
	if (numberOfBooksCurrentMonth > numberOfBooksPreviousMonth) {
		month = currentMonth;
		monthNumber = currentMonthNumber;
		numberOfBooksMonth = numberOfBooksCurrentMonth;
	} else if (numberOfBooksCurrentMonth <= 1 && day <= 15 && numberOfBooksPreviousMonth >= 1) {
		month = previousMonth;
		monthNumber = previousMonthNumber;
		numberOfBooksMonth = numberOfBooksPreviousMonth;
		activeState.startPageMonthBooks = numberOfBooksPreviousMonth;

		if (numberOfBooksPreviousMonth === 1) {
			bookText = 'book read in';
		}
	} else if (numberOfBooksCurrentMonth === 1 && day > 15) {
		month = currentMonth;
		monthNumber = currentMonthNumber;
		numberOfBooksMonth = numberOfBooksCurrentMonth;
		bookText = 'book read so far in';
	} else if (numberOfBooksCurrentMonth > 1 && day <= 15) {
		month = currentMonth;
		monthNumber = currentMonthNumber;
		numberOfBooksMonth = numberOfBooksCurrentMonth;
		bookText = 'books read so far in';
	} else {
		month = currentMonth;
		monthNumber = currentMonthNumber;
		numberOfBooksMonth = numberOfBooksCurrentMonth;
	}
</script>

<div
	class="text-[1.2rem] px-2 xl:p-6 flex flex-col xl:flex-row justify-center items-center text-white"
>
	<span class="text-9xl xl:text-[12rem] xl:leading-36 xl:mr-4 text-teal-200 fugaz-one-regular">
		{#if numberOfBooksMonth === 0}
			No
		{:else}
			{numberOfBooksMonth}
		{/if}
	</span>
	<span class="italic flex flex-col xl:flex-row items-start xl:items-baseline">
		{bookText}
		<span class="text-5xl rozha-one-regular italic ml-10 xl:ml-3 mt-1 xl:mt-0 text-teal-200">
			{month}
		</span>
	</span>
</div>

<script lang="ts">
	interface Props {
		year?: number;
		numberOfBooksYear: number;
		numberOfBooksMonth: number;
	}

	let { year, numberOfBooksYear, numberOfBooksMonth }: Props = $props();

	// Amount of books for the current month
	const splitBookStacksMonth = Math.floor(numberOfBooksMonth / 5);
	const oddBooksMonth = numberOfBooksMonth % 5;

	// Amount of books for the year minus the current month
	const restOfYearBooks = numberOfBooksYear - numberOfBooksMonth;
	const restOfYearBooksInOddStack = 5 - oddBooksMonth; // Amount of books that fills an eventual odd stack of month books
	const restOfYearBooksToStack = restOfYearBooks - restOfYearBooksInOddStack;
	const restOfYearSplitStacks = Math.floor(restOfYearBooksToStack / 5);
	const restOfYearOddBooks = restOfYearBooksToStack % 5;
</script>

<div class="year-statistic lg:p-8 flex flex-col items-center text-white">
	<figure class="flex gap-1 items-center mb-4 flex-wrap justify-center w-5/6">
		{#each { length: splitBookStacksMonth } as _, i}
			<div class="mr-2 flex gap-1 mt-1">
				{#each { length: 5 } as _, i}
					<div class="w-1.5 h-8 bg-teal-400"></div>
				{/each}
			</div>
		{/each}
		{#if oddBooksMonth}
			<div class="mr-2 flex gap-1 mt-1">
				{#each { length: oddBooksMonth } as _, i}
					<div class="w-1.5 h-8 bg-teal-400"></div>
				{/each}
				{#if numberOfBooksMonth !== numberOfBooksYear && restOfYearBooksInOddStack}
					{#each { length: restOfYearBooksInOddStack } as _, i}
						<div class="w-1.5 h-8 bg-teal-700"></div>
					{/each}
				{/if}
			</div>
		{/if}
		{#each { length: restOfYearSplitStacks } as _, i}
			<div class="mr-2 flex gap-1 mt-1">
				{#each { length: 5 } as _, i}
					<div class="w-1.5 h-8 bg-teal-700"></div>
				{/each}
			</div>
		{/each}
		{#if numberOfBooksMonth !== numberOfBooksYear && restOfYearOddBooks}
			<div class="mr-2 flex gap-1 mt-1">
				{#each { length: restOfYearOddBooks } as _, i}
					<div class="w-1.5 h-8 bg-teal-700"></div>
				{/each}
			</div>
		{/if}
		<!-- <figcaption class="text-sm fira-mono-regular mt-1">({numberOfBooksYear})</figcaption> -->
	</figure>

	<p class="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-baseline italic text-center">
		<span>of the {numberOfBooksYear} books read in</span>
		<span class="text-4xl font-semibold text-teal-200 lg:ml-1 fugaz-one-regular">{year}</span>
	</p>
</div>

<style>
	.year-statistic {
		font-size: 1.2rem;
		max-width: 600px;
	}

	@media (min-width: 1280px) {
		.year-statistic {
			max-width: 100%;
		}
	}
</style>

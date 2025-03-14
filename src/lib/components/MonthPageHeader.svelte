<script lang="ts">
	interface Props {
		month?: string;
		tryingToAccessTheFuture: boolean;
	};

	let { month, tryingToAccessTheFuture }: Props = $props();

	let formattedMonth: string = $state('');

	if (!month) {
		formattedMonth = 'No month found';
	} else {
		formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
	};

</script>

<section
	class="col-start-1 col-end-7 row-start-1 row-end-2 flex justify-center items-center {tryingToAccessTheFuture
		? 'xl:mt-8'
		: ''}"
>
	<div class="flex items-center justify-center">
		{#if !month}
			<h1 class="text-[4rem] md:text-[8rem] xl:text-[10rem] flex items-center justify-center rozha-one-regular italic text-center w-full mt-5 lg:mt-0">
				{formattedMonth}
			</h1>
		{:else}
			<h1
				class="text-[4rem] md:text-[8rem] xl:text-[10rem] flex items-center justify-center rozha-one-regular italic text-center w-full mt-5 lg:mt-0"
			>
				{formattedMonth}
			</h1>
		{/if}
	</div>
</section>

<script lang="ts">
	import ButtonLink from '$lib/components/ButtonLink.svelte';

	interface Props {
		currentYear: string;
		title: string;
		isThisTheFuture: boolean;
	}

	let { currentYear, title, isThisTheFuture }: Props = $props();
</script>

<section
	class="col-start-1 col-end-7 row-span-2 flex flex-col justify-center items-center gap-6 h-fit mt-6"
>
	<h2 class="rozha-one-regular text-4xl lg:text-5xl text-teal-200 text-center mb-2">
		{title}
	</h2>
	<div
		class="flex flex-col w-full lg:max-w-fit gap-4 lg:gap-4 items-center justify-center lg:bg-teal-900 lg:rounded-xl px-3 lg:p-6"
	>
		<p class="text-center text-sm lg:text-base">
			{#if isThisTheFuture}
				Well, I haven't read any books during this month (yet) in any case.
			{:else}
				Looks like I haven't read any books during this month.
			{/if}
		</p>
		<ButtonLink
			title="Go back to home"
			linkName="/"
			theme="teritary"
			className="p-3 w-full lg:w-1/2 fira-mono-medium"
			typeOfLink="internal"
		/>
		<p class="text-center text-sm lg:text-base mt-2">Or check out this year's reading so far</p>
		<ButtonLink
			title="Reading done in {currentYear}"
			linkName="/{currentYear}"
			theme="teritary"
			className="p-3 w-full lg:w-1/2 fira-mono-medium"
			typeOfLink="internal"
		/>
	</div>
</section>

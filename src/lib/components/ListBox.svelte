<script lang="ts">
	interface Props {
		arrayOfItems: string[];
		header: string;
		shortTitles?: boolean;
	};

	let { arrayOfItems, header, shortTitles }: Props = $props();
	
</script>

<div
	class="max-w-[600px] lg:max-w-full flex flex-col grow lg:pt-4 lg:pb-0"
>
	<h3 class="fira-mono-medium text-xl xl:text-2xl mb-4 w-full text-center lg:text-left">{header}</h3>
	<ol
		class="columns-1 lg:columns-2 gap-4 break-words
		{shortTitles ? 'lg:columns-3 xl:columns-4' : 'lg:columns-2 xl:columns-3'}"
	>
		{#each arrayOfItems as itemTitle, i}
			<li class="text-sm flex items-center gap-2 mb-3 {shortTitles ? 'lg:mr-2 xl:mr-4' : 'lg:mr-2'} ">
				<span class="bg-teal-950 p-2 rounded-md shrink-0 min-w-[2rem] text-center"
					>{i + 1}</span
				>
				<span class="break-words">{itemTitle}</span>
			</li>
		{/each}
	</ol>
</div>

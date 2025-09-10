<script lang="ts">
	interface Props {
		arrayOfPills: string[];
		header: string;
	}

	let { arrayOfPills, header }: Props = $props();
</script>

<div
	class="max-w-[600px] lg:max-w-full flex flex-col grow items-center text-white bg-teal-900 rounded-lg p-4 py-6"
>
	<h3 class="fira-mono-medium text-2xl mb-4">{header}</h3>
	<div class="flex gap-2 flex-wrap justify-center">
		{#each arrayOfPills as pillTitle}
			<div class="bg-teal-700 p-2 rounded-md">{pillTitle}</div>
		{/each}
	</div>
</div>

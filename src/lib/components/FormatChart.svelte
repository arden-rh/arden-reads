<script lang="ts">
	import type { Book } from '$lib/types/book.types';

	interface Props {
		listOfBooks: Book[];
	}

	let { listOfBooks }: Props = $props();

	let formatData: {
		format: string;
		count: number;
		percentage: number;
		color: string;
		legendColor: string;
	}[] = $state([]);

	const chartColors = [
		'#2dd4bf', // teal-400
		'#14b8a6', // teal-500
		'#0d9488', // teal-600
		'#0f766e', // teal-700
		'#134e4a', // teal-800
		'#5eead4', // teal-300
	];

	const legendColors = [
		'bg-teal-400',
		'bg-teal-500',
		'bg-teal-600',
		'bg-teal-700',
		'bg-teal-800',
		'bg-teal-300'
	];

	function countFormats(books: Book[]): Record<string, number> {
		const formatCounts: Record<string, number> = {};

		books.forEach((book) => {
			book.formats.forEach((format) => {
				formatCounts[format] = (formatCounts[format] || 0) + 1;
			});
		});

		return formatCounts;
	};

	function transformTitle(title: string): string {
		return title
			.split('_')
			.join(' ');
	};

	function transformFormatCounts(formatCounts: Record<string, number>) {
		const total = Object.values(formatCounts).reduce((sum, count) => sum + count, 0);
		return Object.entries(formatCounts).map(([format, count], index) => {
			return {
				format: transformTitle(format),
				count,
				percentage: (count / total) * 100,
				legendColor: `${legendColors[index % legendColors.length]}`,
				color: `${chartColors[index % chartColors.length]}`
			};
		});
	};

	const formats = countFormats(listOfBooks);
	formatData = transformFormatCounts(formats);

</script>

<div class="flex h-full lg:h-fit w-full lg:max-w-[275px] xl:max-w-full gap-8 items-center justify-center my-2 lg:my-0 lg:pl-4">
	<figure class="flex flex-col items-center h-5/6 min-w-2/3">
		<figcaption class="fira-mono-medium text-xl mb-2 lg:mb-4">Formats</figcaption>

		<svg viewBox="0 0 36 36" class="w-[200px] lg:w-[150px] xl:w-[300px] max-w-[200px] lg:max-w-[150px] xl:max-w-[300px] h-full">
			{#each formatData as { format, percentage, color }, index}
				<circle
					r="15"
					cx="18"
					cy="18"
					fill="transparent"
					stroke={color}
					stroke-width="5"
					stroke-dasharray="{percentage} 100"
					stroke-dashoffset={formatData.slice(0, index).reduce((sum, d) => sum - d.percentage, 0)}
					transform="rotate(-90 18 18)"
				>
					<!-- <title>{format}: {percentage.toFixed(1)}%</title> -->
				</circle>
			{/each}
		</svg>
	</figure>
	<!-- Legend -->
	<div class="flex flex-col gap-2 justify-center mr-4 mt-4 lg:mt-8 xl:mr-6 xl:min-w-[120px]">
		{#each formatData as { format, legendColor, percentage }}
			<button class="flex items-center gap-2 group focus-visible:p-1">
				<span class="w-4 h-4 rounded-full {legendColor} min-w-[1rem] group-hover:hidden group-focus:hidden"></span>
				<span class="text-[0.7rem] lg:text-sm hidden group-hover:inline group-focus:inline">
					{percentage.toFixed()}%
				</span>
				<span class="text-[0.7rem] lg:text-sm text-left">{format}</span>
			</button>
		{/each}
	</div>
</div>

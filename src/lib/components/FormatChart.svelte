<script lang="ts">
	import type { Book } from '$lib/types/book.types';
	import Button from './Button.svelte';

	interface Props {
		listOfBooks: Book[];
	}

	let { listOfBooks }: Props = $props();

	let formatData: {
		format: string;
		count: number;
		percentage: number;
		strokeLength: number;
		previousTotal: number;
		color: string;
		legendColor: string;
	}[] = $state([]);

	const chartColors = [
		'#2dd4bf', // teal-400
		'#14b8a6', // teal-500
		'#0d9488', // teal-600
		'#0f766e', // teal-700
		'#134e4a', // teal-800
		'#5eead4' // teal-300
	];

	const legendColors = [
		'bg-teal-400',
		'bg-teal-500',
		'bg-teal-600',
		'bg-teal-700',
		'bg-teal-800',
		'bg-teal-300'
	];

	let showPecentage = $state(false);
	const circumference = 2 * Math.PI * 15;

	function countFormats(books: Book[]): Record<string, number> {
		const formatCounts: Record<string, number> = {};

		books.forEach((book) => {
			book.formats.forEach((format) => {
				formatCounts[format] = (formatCounts[format] || 0) + 1;
			});
		});

		return formatCounts;
	}

	function transformTitle(title: string): string {
		return title.split('_').join(' ');
	}

	function transformFormatCounts(formatCounts: Record<string, number>) {
		const total = Object.values(formatCounts).reduce((sum, count) => sum + count, 0);
		let accumulatedOffset = 0;

		return Object.entries(formatCounts).map(([format, count], index) => {
			const percentage = (count / total) * 100;
			const strokeLength = (percentage / 100) * circumference;
			const previousTotal = accumulatedOffset;
			accumulatedOffset += strokeLength;

			return {
				format: transformTitle(format),
				count,
				percentage,
				strokeLength,
				previousTotal,
				legendColor: `${legendColors[index % legendColors.length]}`,
				color: `${chartColors[index % chartColors.length]}`
			};
		});
	}

	const formats = countFormats(listOfBooks);
	formatData = transformFormatCounts(formats);

</script>

<div
	class="flex h-full lg:h-fit w-full lg:max-w-[275px] xl:max-w-full gap-8 items-center justify-center my-2 lg:my-0 lg:pl-4"
>
	<figure class="flex flex-col items-center h-5/6 min-w-2/3">
		<figcaption class="fira-mono-medium text-xl mb-2 lg:mb-4">Formats</figcaption>
		<svg
			viewBox="0 0 36 36"
			class="w-[200px] lg:w-[150px] xl:w-[300px] max-w-[200px] lg:max-w-[150px] xl:max-w-[300px] h-full"
		>
			{#each formatData as { color, strokeLength, previousTotal }}
				<circle
					r="15"
					cx="18"
					cy="18"
					fill="transparent"
					stroke={color}
					stroke-width="5"
					stroke-dasharray="{strokeLength} {circumference}"
					stroke-dashoffset="-{previousTotal}"
					transform="rotate(-90 18 18)"
				>
				</circle>
			{/each}
		</svg>
	</figure>
	<!-- Legend -->
	<div class="flex flex-col gap-2 justify-center mr-4 mt-4 lg:mt-8 xl:mr-6 xl:min-w-[120px]">
		{#each formatData as { format, legendColor, percentage }}
			<div class="flex items-center gap-2 focus-visible:p-1">
				<span
					class="w-4 h-4 rounded-full {legendColor} min-w-[1rem] {legendColor} {showPecentage
						? 'hidden'
						: 'inline'}"
				></span>
				<span class="text-[0.7rem] lg:text-sm {showPecentage ? 'inline' : 'hidden'}">
					{percentage.toFixed()}%
				</span>
				<span class="text-[0.7rem] lg:text-sm text-left">{format}</span>
			</div>
		{/each}
		<Button
			title={showPecentage ? 'Hide %' : 'Show %'}
			theme="teritary"
			onClick={() => (showPecentage = !showPecentage)}
			className="p-1 px-2 mt-2 w-fit text-sm cursor-pointer focus-visible:ring-3"
		/>
	</div>
</div>

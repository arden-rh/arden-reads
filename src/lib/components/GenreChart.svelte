<script lang="ts">
	import type { Book } from '$lib/types/book.types';

	interface Props {
		listOfBooks: Book[];
	}

	let { listOfBooks }: Props = $props();

	let genreData: {
		genre: string;
		count: number;
		percentage: number;
		color: string;
		legendColor: string;
	}[] = $state([]);

	const chartColors = [
		'#2dd4bf', // teal-400
		'#0d9488', // teal-600
		'#14b8a6', // teal-500
		'#0f766e', // teal-700
		'#134e4a', // teal-800
		'#0d9488', // teal-600
		'#5eead4', // teal-300
		'#14b8a6', // teal-500
		'#0f766e', // teal-700
	];

	const legendColors = [
		'bg-teal-400',
		'bg-teal-600',
		'bg-teal-500',
		'bg-teal-700',
		'bg-teal-800',
		'bg-teal-600',
		'bg-teal-300',
		'bg-teal-500',
		'bg-teal-700'
	];

	function countGenres(books: Book[]): Record<string, number> {
		const genreCounts: Record<string, number> = {};

		books.forEach((book) => {
			book.genres.forEach((genre) => {
				genreCounts[genre] = (genreCounts[genre] || 0) + 1;
			});
		});

		return genreCounts;
	}

	function transformGenreCounts(genreCounts: Record<string, number>) {
		const total = Object.values(genreCounts).reduce((sum, count) => sum + count, 0);
		return Object.entries(genreCounts).map(([genre, count], index) => {
			return {
				genre,
				count,
				percentage: (count / total) * 100,
				legendColor: `${legendColors[index % legendColors.length]}`,
				color: `${chartColors[index % chartColors.length]}`
			};
		});
	}

	const genres = countGenres(listOfBooks);
	genreData = transformGenreCounts(genres);
</script>

<div
	class="flex h-full lg:h-fit w-full lg:max-w-[275px] xl:max-w-full gap-8 items-center justify-center my-2 lg:my-0 grow"
>
	<figure class="flex flex-col items-center h-5/6 w-2/3">
		<figcaption class="fira-mono-medium text-xl mb-2 lg:mb-4">Genres</figcaption>

		<svg
			viewBox="0 0 36 36"
			class="w-[200px] lg:w-[150px] xl:w-[300px] max-w-[200px] lg:max-w-[150px] xl:max-w-[300px] h-full"
		>
			{#each genreData as { genre, percentage, color }, index}
				<circle
					r="15"
					cx="18"
					cy="18"
					fill="transparent"
					stroke={color}
					stroke-width="5"
					stroke-dasharray="{percentage} 100"
					stroke-dashoffset={genreData.slice(0, index).reduce((sum, d) => sum - d.percentage, 0)}
					transform="rotate(-90 18 18)"
				>
					<!-- <title>{genre}: {percentage.toFixed(1)}%</title> -->
				</circle>
			{/each}
		</svg>
	</figure>
	<!-- Legend -->
	<div class="flex flex-col gap-2 justify-center mr-4 xl:mr-6 xl:min-w-[120px]">
		{#each genreData as { genre, legendColor, percentage }}
			<button
				class="flex items-center gap-2 group focus-visible:p-1"
			>
				<span
					class="w-4 min-w-4 h-4 rounded-full {legendColor} group-hover:hidden group-focus:hidden"
				></span>
				<span class="text-[0.7rem] lg:text-sm hidden group-hover:inline group-focus:inline">
					{percentage.toFixed()}%
				</span>
				<span class="text-[0.7rem] lg:text-sm text-left">{genre}</span>
			</button>
		{/each}
	</div>
</div>

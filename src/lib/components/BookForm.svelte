<script lang="ts">
	import { enhance } from '$app/forms';

	import { arrayOfFormatOptions } from '$lib/data/formats';
	import { arrayOfGenreOptions } from '$lib/data/genres';

	interface Props {
		handleSubmit: (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) => Promise<void>;
	};

	let { handleSubmit }: Props = $props();

	interface Option {
		label: string;
		value: string;
	};

	let chosenFormatOptions: Option[] = $state([]);
	let chosenGenreOptions: Option[] = $state([]);

	function handleChooseFormats(event: Event) {
		const option = event.target as HTMLOptionElement;
		const newOption = { label: option.label, value: option.value };

		if (!option.label) {
			return;
		}

		if (!chosenFormatOptions.some((option) => option.value === newOption.value)) {
			chosenFormatOptions.push(newOption);
		} else {
			return;
		}
	};

	function handleChooseGenres(event: Event) {
		const option = event.target as HTMLOptionElement;
		const newOption = { label: option.label, value: option.value };

		if (!newOption.label) {
			return;
		}

		if (!chosenGenreOptions.some((option) => option.value === newOption.value)) {
			chosenGenreOptions.push(newOption);
		} else {
			return;
		}
	};

	function removeElementFromArray(option: Option, array: Option[]) {
		const elementIndex = array.indexOf(option);
		array.splice(elementIndex, 1);
	};

	function handleReset(event: Event) {
		chosenFormatOptions = [];
		chosenGenreOptions = [];
	};

</script>

<div
	class="lg:min-w-1/3 w-auto max-w-full bg-teal-800 flex flex-col justify-center items-center rounded-lg p-4 shadow-md"
>
	<form
		class="flex flex-col gap-3 max-w-full"
		method="POST"
		action="?/create"
		onsubmit={handleSubmit}
		onreset={handleReset}
		use:enhance
	>
		<span class="flex flex-col gap-0.5">
			<label for="title">Title</label>
			<input name="title" type="text" id="title" autocomplete="off" required />
		</span>
		<span class="flex flex-col gap-0.5">
			<label for="author">Author</label>
			<input name="author" type="text" id="author" required />
		</span>
		<span class="flex flex-col lg:flex-row gap-3 items-center mt-1">
			<label for="pages">Pages</label>
			<input name="pages" type="number" id="pages" class="w-full lg:w-auto" />
			<label for="minutes">Minutes</label>
			<input name="minutes" type="number" id="minutes" class="w-full lg:w-auto" />
		</span>
		<span class="flex flex-col gap-0.5">
			<label for="formats-select">Formats</label>
			<select
				name="formats-select"
				id="formats-select"
				required
				multiple
				onclick={handleChooseFormats}
			>
				{#each arrayOfFormatOptions as formatOption}
					<option
						value={formatOption.value}
						disabled={chosenFormatOptions.length >= 2 &&
							!chosenFormatOptions.includes(formatOption)}
					>
						{formatOption.label}
					</option>
				{/each}
			</select>
			<div class="flex gap-1.5 mt-3">
				{#each chosenFormatOptions as option}
					<button
						class="bg-teal-700 text-white rounded-lg p-2 flex gap-4"
						onclick={() => removeElementFromArray(option, chosenFormatOptions)}
					>
						<span>{option.label}</span><span class="pr-1">x</span>
					</button>
				{/each}
			</div>
		</span>
		<span class="flex flex-col gap-0.5">
			<label for="genres-select">Genres</label>
			<select
				name="genres-select"
				id="genres-select"
				required
				multiple
				onclick={handleChooseGenres}
			>
				{#each arrayOfGenreOptions as genreOption}
					<option
						value={genreOption.value}
						disabled={chosenGenreOptions.length >= 5 && !chosenGenreOptions.includes(genreOption)}
					>
						{genreOption.label}</option
					>
				{/each}
			</select>
			<div class="flex gap-1.5 mt-3 flex-wrap">
				{#each chosenGenreOptions as option}
					<button
						class="bg-teal-700 text-white rounded-lg p-2 flex gap-4"
						onclick={() => removeElementFromArray(option, chosenGenreOptions)}
					>
						<span>{option.label}</span><span class="pr-1">x</span>
					</button>
				{/each}
			</div>
		</span>
		<input
			type="hidden"
			name="formats"
			value={JSON.stringify(chosenFormatOptions.map((o) => o.value))}
		/>
		<input
			type="hidden"
			name="genres"
			value={JSON.stringify(chosenGenreOptions.map((o) => o.value))}
		/>
		<span class="flex flex-col gap-0.5">
			<label for="date">Date Finished</label>
			<input name="date" type="date" id="date" required />
		</span>
		<span class="flex flex-col gap-0.5">
			<label for="owned">Owned Book?</label>
			<div>
				<span class="flex gap-2">
					<input type="radio" name="owned" value="no" checked required />No
				</span>
				<span class="flex gap-2">
					<input type="radio" name="owned" value="yes" required />Yes
				</span>
			</div>
		</span>
		<span class="flex flex-col gap-0.5">
			<label for="favourite_book_per_month">Favourite Book Read This Month?</label>
			<div>
				<span class="flex gap-2">
					<input type="radio" name="favourite_book_per_month" value="no" checked required />No
				</span>
				<span class="flex gap-2">
					<input type="radio" name="favourite_book_per_month" value="yes" required />Yes
				</span>
			</div>
		</span>
		<span class="flex gap-4 w-full">
			<button
				type="submit"
				class="bg-teal-950 fira-mono-regular rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md mt-4 flex-grow"
			>
				Submit
			</button>
			<button
				type="reset"
				class="bg-teal-950 fira-mono-regular rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md mt-4 flex-grow"
			>
				Reset
			</button>
		</span>
	</form>
</div>

<script lang="ts">
	// Types
	import type { ActionResult } from '@sveltejs/kit';

	// Components
	import BookForm from '$lib/components/BookForm.svelte';

	import { applyAction, deserialize } from '$app/forms';

	let { form } = $props();

	let hideDialogue: boolean = $state(true);

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		applyAction(result);

		hideDialogue = false;
	};

</script>

<section
	class="col-start-1 col-end-7 row-start-1 row-end-6 flex flex-col gap-4 items-center"
>
	<div class="flex flex-col items-center justify-center">
		<h1
			class="text-2xl lg:text-4xl flex flex-col items-center justify-center text-center text-teal-200"
		>
			Add a new book
		</h1>
	</div>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	{#if form?.success && !hideDialogue}
		<div
			class="min-w-1/3 bg-teal-800 flex flex-col gap-4 justify-center items-center rounded-lg p-4 shadow-md"
		>
			<p>Book created successfully!</p>
			<div class="flex flex-col gap-2 items-center">
				<span>Return to the start page?</span>
				<span class="flex gap-4 items-center justify-center">
					<button
						class="bg-teal-950 fira-mono-regular rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md w-20"
						onclick={() => (hideDialogue = true)}
					>
						No
					</button>
					<a
						class="bg-teal-950 fira-mono-regular rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md w-20"
						href="/"
					>
						Yes
					</a>
				</span>
			</div>
		</div>
	{/if}
	<BookForm {handleSubmit} />
</section>

<script lang="ts">
	import { enhance } from '$app/forms';

	// Types
	import type { ActionResult } from '@sveltejs/kit';

	let { data, form } = $props();

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

		hideDialogue = false;
	};

</script>

<section class="col-start-1 col-end-7 row-start-1 row-end-6 flex flex-col gap-4 items-center">
	<div class="flex flex-col items-center justify-center">
		<h1
			class="text-2xl lg:text-4xl flex flex-col items-center justify-center text-center text-teal-200"
		>
			Login
		</h1>
	</div>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<div
		class="w-auto max-w-full bg-teal-800 flex flex-col justify-center items-center rounded-lg p-4 shadow-md"
	>
		<form
			class="flex flex-col gap-2 max-w-full"
			method="POST"
			action="?/login"
			onsubmit={handleSubmit}
			use:enhance
		>
			<label for="username">Username</label>
			<input
				class="bg-teal-950 rounded-lg p-2"
				type="text"
				id="username"
				name="username"
				required
			/>
			<label for="password">Password</label>
			<input
				class="bg-teal-950 rounded-lg p-2"
				type="password"
				id="password"
				name="password"
				required
			/>
			<button
				class="bg-teal-950 fira-mono-regular text-teal-200 rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md"
				type="submit"
			>
				Login
			</button>
		</form>
	</div>
</section>

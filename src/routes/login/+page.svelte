<script lang="ts">
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { activeState } from '../../states.svelte';

	// Types
	import type { ActionResult } from '@sveltejs/kit';

	import Button from '$lib/components/Button.svelte';

	let { form } = $props();

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

		if (result.type === 'success') {
			activeState.loggedIn = true;
			goto('/');
		}

		await applyAction(result);
	}
</script>

<section class="col-start-1 col-end-7 row-start-1 row-end-6 flex flex-col gap-4 items-center">
	<div class="flex flex-col items-center justify-center">
		<h1
			class="text-2xl lg:text-4xl flex flex-col items-center justify-center text-center text-teal-200"
		>
			{#if activeState.loggedIn}
				Log out
			{:else}
				Login
			{/if}
		</h1>
	</div>
	{#if form && form.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<div
		class="w-full max-w-[350px] bg-teal-800 flex flex-col justify-center items-center rounded-lg p-4 shadow-md"
	>
		{#if !activeState.loggedIn}
			<form
				class="flex flex-col gap-2 w-full"
				method="POST"
				action="?/login"
				onsubmit={handleSubmit}
			>
				<label for="email">Email</label>
				<input class="bg-teal-950 rounded-lg p-2" type="text" id="email" name="email" required />
				<label for="password">Password</label>
				<input
					class="bg-teal-950 rounded-lg p-2 mb-4"
					type="password"
					id="password"
					name="password"
					required
				/>
				<Button title="Login" theme="primary" />
			</form>
		{/if}
		{#if activeState.loggedIn}
			<form
				method="POST"
				action="?/logout"
				class="flex flex-col gap-2 w-full mt-4"
				use:enhance={({}) => {
					return async ({ result }) => {
						activeState.loggedIn = false;

						if (result.type === 'redirect') {
							goto(result.location);
						} else {
							await applyAction(result);
						}
					};
				}}
			>
				<Button title="Logout" theme="primary" />
			</form>
		{/if}
	</div>
</section>

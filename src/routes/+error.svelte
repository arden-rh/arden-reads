<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
</script>

<section class="col-start-1 col-end-7 flex flex-col items-center">
	<div
		class="flex flex-col gap-4 bg-teal-900 px-8 py-6 rounded-lg mt-10 shadow-md w-fit lg:max-w-1/2 xl:max-w-2/5"
	>
		<h1 class="text-5xl text-center fugaz-one-regular tracking-wider">{page.status}</h1>

		{#if page.error?.message === 'Month book list not found' || true}
			<div class="flex flex-col gap-2">
				<p class="flex flex-col gap-2 text-center mb-2">
					<span>Oh no, it seems like the data was a bit slow to load.</span>
					<span>Let's try to refresh the page to see if it has catched up.</span>
				</p>
				<Button
					title="Refresh"
					theme="primary"
					onClick={() => window.location.reload()}
				/>
			</div>
			<div>
				<p class="text-center mb-2">Or go back to the home page.</p>
				<ButtonLink title="Home page" linkName="/" theme="primary" typeOfLink="internal" />
			</div>
		{:else}
			<p class="text-center mb-4">{page.error?.message}</p>
			<div class="flex gap-4 justify-center">
				<ButtonLink
					title="Go back to the home page"
					linkName="/"
					theme="primary"
					typeOfLink="internal"
				/>
			</div>
		{/if}
	</div>
</section>

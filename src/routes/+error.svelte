<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="col-start-1 col-end-7 flex flex-col items-center">
	<div
		class="flex flex-col gap-4 bg-teal-800 px-8 py-6 rounded-lg mt-10 shadow-md w-fit lg:max-w-1/2 xl:max-w-2/5"
	>
		<h1 class="text-5xl text-center fugaz-one-regular tracking-wider">{page.status}</h1>

		{#if page.error?.message === 'Month book list not found'}
			<div class="flex flex-col gap-2">
				<p class="flex flex-col gap-2 text-center mb-2">
					<span>Oh no, it seems like the data was a bit slow to load.</span>
					<span>Let's try to refresh the page to see if it has catched up.</span>
				</p>

				<button
					class="btn-basic bg-teal-950 hover:bg-teal-600 cursor-pointer"
					onclick={() => window.location.reload()}
				>
					Refresh
				</button>
			</div>
			<div>
				<p class="text-center mb-2">Or go back to the home page.</p>
				<a class="btn-basic bg-teal-950 hover:bg-teal-600" href="/">
					Home page
				</a>
			</div>
		{:else}
			<p class="text-center mb-4">{page.error?.message}</p>
			<div class="flex gap-4 justify-center">
				<a class="btn-basic bg-teal-950 hover:bg-teal-600" href="/">Go back to the home page</a>
			</div>
		{/if}
	</div>
</section>

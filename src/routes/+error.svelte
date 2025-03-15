<script lang="ts">
	import { page } from '$app/state';

</script>

<section class="col-start-1 col-end-7 row-start-1 row-end-3 flex flex-col items-center">
	<div class="flex flex-col gap-2 bg-teal-800 px-8 py-6 rounded-lg mt-10 shadow-md">
		<h1 class="text-4xl text-center">{page.status}</h1>
		<p class="text-center mb-4">{page.error?.message}</p>
		<a
			class="bg-teal-950 fira-mono-regular text-center rounded-lg p-2 flex justify-center items-center tracking-wide shadow-md"
			href="/"
		>
			Go back to the home page
		</a>
	</div>
</section>

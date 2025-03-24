<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';

	let personalInfo = $state(true);
</script>

<section
	class="col-start-1 col-end-7 row-span-2 flex flex-col justify-center items-center h-fit max-h-fit"
>
	<h1
		class="text-[4rem] md:text-[8rem] md:leading-none xl:text-[10rem] italic rozha-one-regular text-center lg:my-4 xl:my-6 w-full"
	>
		About
	</h1>
	<div
		class="flex flex-col items-center gap-4 justify-center w-[95%] lg:bg-teal-900 rounded-xl p-4 lg:p-6 max-w-[600px]"
	>
		<div class="flex gap-2 w-full lg:w-2/3 justify-center">
			<Button
				title="Arden"
				theme="secondary"
				active={personalInfo}
				className="w-1/2"
				onClick={() => (personalInfo = true)}
			/>
			<Button
				title="Project"
				theme="secondary"
				active={!personalInfo}
				className="w-1/2"
				onClick={() => (personalInfo = false)}
			/>
		</div>
		{#if personalInfo}
			<div class="flex flex-col gap-2">
				<h2 class="fira-mono-medium text-2xl text-center">Who is Arden?</h2>
				<p class="text-[0.95rem] lg:text-base">
					Arden is a Front End developer living in Malmö, Sweden. <br /> He loves to read, play
					video games and take care of his many plants. When he is not doing any of those things, or
					coding, he likes to take walks by the sea, make mediocre latte art and play D&D.
					<span class="block mt-3">
						He is currently looking for a job, so if you've enjoyed this webpage, please don't
						hesitate to contact him.
					</span>
				</p>
			</div>
		{:else}
			<div class="flex flex-col gap-2">
				<h2 class="fira-mono-medium text-2xl text-center">What is this project?</h2>
			</div>
		{/if}
		<div
			class="flex flex-col gap-2 w-full bg-teal-900 rounded-xl p-3 text-center lg:bg-none lg:rounded-none lg:p-0 lg:text-left"
		>
			<h3 class="fira-mono-medium text-[1.15rem]">You can find Arden here</h3>
			<ul class="flex flex-col gap-2 w-full mb-1 ml-2 lg:ml-0 text-[0.95rem] lg:text-base">
				<li class="flex items-center gap-2">
					<ButtonLink
						title="LinkedIn"
						linkName="https://www.linkedin.com/in/arden-haldorson/"
						theme="primary"
						typeOfLink="external"
					/>
				</li>
				<li class="flex items-center gap-2">
					<ButtonLink
						title="Github (arden-rh)"
						linkName="https://github.com/arden-rh"
						theme="primary"
						typeOfLink="external"
					/>
				</li>
			</ul>
			<p class="text-[0.95rem] lg:text-base">
				Or contact him directly at 
				<a
					href="mailto:arden.haldorson@gmail.com"
					target="_blank"
					class="underline underline-offset-3">arden.haldorson[at]gmail.com</a
				>
			</p>
		</div>
	</div>
</section>

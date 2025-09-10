<script>
	export let color = 'white';
	export let size = 150;
	export let unit = 'px';
	const diamondCount = 4;
</script>

<div
	class="flex justify-center items-center"
	style="width: {size}{unit}; height: {size / 3}{unit}; gap: {size / 10}{unit};"
>
	{#each Array(diamondCount) as _, i}
		<div style="transform: rotate(45deg);">
			<div
				class="rounded-sm bounce"
				style="
        		width: {size / 6}{unit};
        		height: {size / 6}{unit};
        		background-color: {color};
        		animation-delay: {i * 0.15}s;
      			"
			></div>
		</div>
	{/each}
</div>

<style>
	.bounce {
		display: inline-block;
		animation: bounce 0.9s infinite ease-in-out;
		transform-origin: center;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0.4);
		}
		40% {
			transform: scale(1);
		}
	}
</style>

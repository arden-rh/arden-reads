<script lang="ts">
	interface Props {
		pathCssClass: string;
		svgCssClass: string;
	}

	let { pathCssClass, svgCssClass }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.71 219.24" class={svgCssClass}>
	<path class={pathCssClass} d="M0,0h33v219H0V0Z" />
	<path class={pathCssClass} d="M64.28,25l29.27-15.24,101.16,194.24-29.27,15.24L64.28,25Z" />
	<path class={pathCssClass} d="M40,55h33v164h-33V55Z" />
</svg>

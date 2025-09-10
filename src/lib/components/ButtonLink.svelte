<script lang="ts">
	interface Props {
		active?: boolean;
		className?: string;
		disabled?: boolean;
		linkName: string;
		theme: 'primary' | 'secondary' | 'teritary';
		title: string;
		typeOfLink: 'internal' | 'external' | 'admin';
		onClick?: () => void;
	}

	let {
		active,
		className,
		disabled = false,
		linkName,
		theme = 'primary',
		title,
		typeOfLink = 'internal',
		onClick
	}: Props = $props();

	const themes = {
		primary: {
			base: 'bg-teal-950 hover:bg-teal-700 hover:underline hover:underline-offset-2 cursor-pointer',
			active: 'bg-teal-700 cursor-default',
			responsive: ''
		},
		secondary: {
			base: 'bg-teal-900 shadow-none hover:bg-teal-700 cursor-pointer hover:underline hover:underline-offset-2',
			active: 'bg-teal-800 cursor-default',
			responsive: ''
		},
		teritary: {
			base: 'bg-teal-400 hover:bg-teal-500 text-teal-950',
			active: '',
			responsive: 'lg:bg-teal-950 lg:text-white lg:hover:bg-teal-700'
		}
	};

	const selectedTheme = themes[theme];
</script>

{#if disabled}
	<div class="btn-basic bg-teal-950 opacity-70">
		{title}
	</div>
{:else if typeOfLink === 'internal'}
	<a
		href={linkName}
		data-sveltekit-preload-data="tap"
		class="btn-basic {active
			? selectedTheme.active
			: `${selectedTheme.base} ${selectedTheme.responsive}`} {className}"
		onclick={onClick}>{title}</a
	>
{:else if typeOfLink === 'external'}
	<a
		href={linkName}
		target="_blank"
		rel="noreferrer"
		class="btn-basic {active
			? selectedTheme.active
			: `${selectedTheme.base} ${selectedTheme.responsive}`} {className}"
		onclick={onClick}>{title}</a
	>
{:else if typeOfLink === 'admin'}
	<a
		href={linkName}
		data-sveltekit-preload-data="tap"
		tabindex="-1"
		class="btn-basic {active
			? selectedTheme.active
			: `${selectedTheme.base} ${selectedTheme.responsive}`} {className}"
		onclick={onClick}>{title}</a
	>
{/if}

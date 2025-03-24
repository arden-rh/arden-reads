<script lang="ts">
	interface Props {
		id?: string;
		title: string;
		theme?: 'primary' | 'secondary' | 'teritary';
		active?: boolean;
		className?: string;
		onClick?: () => void;
	}

	let { id, title, theme = 'primary', active, className, onClick }: Props = $props();

	const themes = {
		primary: {
			base: 'bg-teal-950 hover:bg-teal-700 cursor-pointer',
			active: 'bg-teal-800 cursor-default',
			responsive: '',
			responsiveActive: ''
		},
		secondary: {
			base: 'bg-teal-900 hover:bg-teal-700 cursor-pointer',
			active: 'bg-teal-700 cursor-default',
			responsive: 'lg:bg-teal-950 lg:hover:bg-teal-700',
			responsiveActive: 'lg:bg-teal-700 cursor-default'
		},
		teritary: {
			base: 'bg-teal-900 hover:bg-teal-800 shadow-none hover:shadow-md cursor-pointer',
			active: 'bg-teal-700 cursor-default',
			responsive: '',
			responsiveActive: ''
		}
	};

	const selectedTheme = themes[theme];

</script>

<button id="button-{id}" class="btn-basic {active ? `${selectedTheme.active} ${selectedTheme.responsiveActive}` : `${selectedTheme.base} ${selectedTheme.responsive}`} {className}" onclick={onClick}>{title}</button>

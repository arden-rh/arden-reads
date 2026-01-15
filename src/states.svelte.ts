export const menu = $state<{
	open: boolean,
	activeYear: number | undefined
}>({
	open: false,
	activeYear: undefined
});

export const currentParams = $state<{
	year: number | undefined,
	month: string | undefined
}>({
	year: undefined,
	month: undefined
});

export const activeState = $state({
	loggedIn: false,
	startPageMonthBooks: 0,
	month: '',
	year: 0
});

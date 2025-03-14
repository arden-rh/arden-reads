export const gridSize = $state({
	small: false,
});

export const menu = $state({
	open: false,
	activeYear: undefined as number | undefined,
});

export const currentParams = $state({
	year: undefined as number | undefined,
	month: undefined as string | undefined,
});

export const activeState = $state({
	loggedIn: false,
	startPageMonthBooks: 0,
	month: '',
	year: 0
});

export const tryingToAccessTheFuture = $state({
	futureDate: false
});
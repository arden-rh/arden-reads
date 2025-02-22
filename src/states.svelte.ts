// export let isLoggedIn = $state(false);
export const gridSize = $state({
	small: false,
});

export const menu = $state({
	open: false,
	activeYear: 2025
});

export const currentParams = $state({
	year: undefined as number | undefined,
	month: undefined as string | undefined
});

export const activeState = $state({
	month: '',
	year: 0
});

export const tryingToAccessTheFuture = $state({
	futureDate: false
});
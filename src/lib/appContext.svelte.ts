import { getContext, setContext } from 'svelte';

const APP_KEY = Symbol('appContext');

class AppContextState {
	menu = $state({ open: false, activeYear: undefined as number | undefined });
	activeState = $state({ loggedIn: false, startPageMonthBooks: 0 });
}

export function setAppContext(): AppContextState {
	const ctx = new AppContextState();
	setContext(APP_KEY, ctx);
	return ctx;
}

export function getAppContext(): AppContextState {
	return getContext<AppContextState>(APP_KEY);
}

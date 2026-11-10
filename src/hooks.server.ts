import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/2027')) {
		redirect(307, '/2026' + event.url.pathname.slice(5));
	}

	return await resolve(event);
};

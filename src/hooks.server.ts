import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname === '/2026' || event.url.pathname === '/2026/') {
		throw redirect(307, '2025');
	}

	return await resolve(event);
}
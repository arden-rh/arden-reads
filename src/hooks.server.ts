import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/2026')) {
		throw redirect(307, '/2025' + event.url.pathname.slice(5));
	}

	return await resolve(event);
}
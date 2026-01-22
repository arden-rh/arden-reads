import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/2027')) {
		redirect(307, '/2026' + event.url.pathname.slice(5));
	}

	return await resolve(event);
}

import { fail, redirect } from '@sveltejs/kit';
import { activeState } from '../../states.svelte';
import type { Actions } from './$types';

import { userPb } from '$lib/pocketbase';

export const prerender = false;

/** TODO
 * 1. Check Lucia for guidelines on how to handle cookies https://lucia-auth.com/sessions/cookies/sveltekit
 */

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const userEmail = data.get('email') as string;
		const userPW = data.get('password') as string;

		try {
			if (!userEmail || !userPW) {
				return fail(400, {
					missing: true
				});
			}

		userPb.autoCancellation(false);

		const authData = await userPb.collection('users').authWithPassword(userEmail, userPW);

			if (!authData) {
				activeState.loggedIn = false;
				return fail(401, { incorrect: true });
			}

			const sessionToken = authData.token;

			cookies.set('pb_token', sessionToken, { path: '/' });

			return { success: true };

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(401, {
				error: error.message
			});
		}
	},
	logout: async ({ cookies }) => {
		// Clear user authentication and cookies
		userPb.authStore.clear();
		cookies.delete('pb_token', { path: '/' });
		activeState.loggedIn = false;

		return redirect(303, '/');
	}
};

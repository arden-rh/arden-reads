import { fail, redirect } from '@sveltejs/kit';
import pb from '$lib/pocketbase';
import { createBookRecord } from '$lib/functions/createBookRecord';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ parent }) => {

	const { auth } = await parent();

	const admin = true; // Replace with actual admin check

	if (!auth || !admin) {
		redirect(307, '/');
	}

	return { auth };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		try {
			const newBook = createBookRecord(data);

			const record = await pb.collection('books').create(newBook);

			return { success: true, record };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
};

import { fail } from '@sveltejs/kit';
import pb from '$lib/pocketbase';
import { createBookRecord } from '$lib/functions/createBookRecord';
import type { Actions } from './$types';

export const prerender = false;

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

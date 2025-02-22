import { adminLogin } from '$lib/pocketbase';
import { getCurrentDate } from '$lib/functions/getCurrentDate';

import pb from '$lib/pocketbase';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ( data ) => {
	const adminEmail = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
	const adminPW = import.meta.env.VITE_POCKETBASE_ADMIN_PW;
	const auth = await adminLogin(adminEmail, adminPW);
	const paramYear = Number(data.params.year);
	const paramMonth = data.params.month;

	if (auth) {
		const { filterString, currentYear, year, monthString, monthNumber, day } = getCurrentDate(paramYear);

		const listOfAllBooks = await pb.collection('books').getFullList();
		const listOfYearBooks = await pb.collection('books').getList(1, 100, { filter: `date_read >= "${year}-01-01 00:00:00" && date_read <= "${year}-12-31 23:59:59"` });
		const monthBooks = await pb.collection('books').getList(1, 50, {
			filter: filterString
		});

		return {
			isLoggedIn: true,
			bookInfo: {
				listOfAllBooks,
				listOfYearBooks,
				monthBooks
			},
			dateInfo: {
				currentYear,
				day,
				monthNumber,
				monthString,
				paramMonth,
				paramYear,
				year,
			}
		};
	}

	return { isLoggedIn: false };
};

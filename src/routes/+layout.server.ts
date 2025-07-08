import { adminLogin } from '$lib/pocketbase';
import { error, fail } from '@sveltejs/kit';
import { getCurrentDate } from '$lib/functions/getCurrentDate';
import { sanitizeListResult } from '$lib/functions/sanitizeListResult';

import type { LayoutServerLoad } from './$types';

import pb from '$lib/pocketbase';

export const load: LayoutServerLoad = async (data) => {
	const adminEmail = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
	const adminPW = import.meta.env.VITE_POCKETBASE_ADMIN_PW;
	const auth = await adminLogin(adminEmail, adminPW);

	let paramYear: number | undefined = undefined;

	if (data.params.year) {
		paramYear = Number(data.params.year);
	};

	const paramMonth = data.params.month;

	const {
		filterString,
		filterStringForPreviousMonth,
		currentYear,
		year,
		day,
		currentMonthNum,
		currentMonthString,
		previousMonthNum,
		previousMonthString
	} = getCurrentDate(paramYear);

	if (!auth) fail(401, { error });

	const listOfAllBooks = await pb.collection('books').getFullList();

	const listOfYearBooks = await pb.collection('books').getList(1, 100, {
		filter: `date_read >= "${year}-01-01 00:00:00" && date_read <= "${year}-12-31 23:59:59"`, offset: 0,
	});

	const currentMonthBooks = await pb.collection('books').getList(1, 50, { filter: filterString, offset: 0 });
	const previousMonthBooks = await pb
		.collection('books')
		.getList(1, 50, { filter: filterStringForPreviousMonth, offset: 0 });

	const latestBookRead = await pb.collection('books').getFirstListItem('', { sort: '-date_read' });

	const bookInfo = {
		listOfAllBooks: structuredClone(listOfAllBooks),
		listOfYearBooks: sanitizeListResult(listOfYearBooks),
		currentMonthBooks: sanitizeListResult(currentMonthBooks),
		previousMonthBooks: sanitizeListResult(previousMonthBooks),
		latestBookRead: structuredClone(latestBookRead)
	};

	return {
		auth,
		bookInfo,
		dateInfo: {
			currentYear,
			currentMonthNum,
			currentMonthString,
			day,
			paramMonth,
			paramYear,
			previousMonthNum,
			previousMonthString,
			year
		}
	};
};

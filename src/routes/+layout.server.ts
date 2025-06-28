import { adminLogin } from '$lib/pocketbase';
import { error, fail } from '@sveltejs/kit';
import { getCurrentDate } from '$lib/functions/getCurrentDate';

import type { LayoutServerLoad } from './$types';

import pb from '$lib/pocketbase';
import { list } from 'postcss';

export const load: LayoutServerLoad = async (data) => {
	const adminEmail = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
	const adminPW = import.meta.env.VITE_POCKETBASE_ADMIN_PW;
	const auth = await adminLogin(adminEmail, adminPW);

	const paramYear = Number(data.params.year);
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
		filter: `date_read >= "${year}-01-01 00:00:00" && date_read <= "${year}-12-31 23:59:59"`
	});

	const currentMonthBooks = await pb.collection('books').getList(1, 50, { filter: filterString });
	const previousMonthBooks = await pb
		.collection('books')
		.getList(1, 50, { filter: filterStringForPreviousMonth });

	const latestBookRead = await pb.collection('books').getFirstListItem('', { sort: '-date_read' });

	const bookInfo = {
		// listOfAllBooks: listOfAllBooks.map((book) => structuredClone(book)),
		listOfAllBooks: JSON.parse(JSON.stringify(listOfAllBooks)),
		// listOfYearBooks: structuredClone(listOfYearBooks),
		listOfYearBooks: JSON.parse(JSON.stringify(listOfYearBooks)),
		// currentMonthBooks: structuredClone(currentMonthBooks),
		currentMonthBooks: JSON.parse(JSON.stringify(currentMonthBooks)),
		// previousMonthBooks: structuredClone(previousMonthBooks),
		previousMonthBooks: JSON.parse(JSON.stringify(previousMonthBooks)),
		// latestBookRead: structuredClone(latestBookRead),
		latestBookRead: JSON.parse(JSON.stringify(latestBookRead))

	};

	// console.log('Book info loaded:', bookInfo);

	return {
		auth,
		// bookInfo: {
		// 	listOfAllBooks,
		// 	listOfYearBooks,
		// 	currentMonthBooks,
		// 	previousMonthBooks,
		// 	latestBookRead
		// },
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

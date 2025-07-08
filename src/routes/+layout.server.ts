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
	}

	const paramMonth = data.params.month;

	const listOfAllBooks = await pb.collection('books').getFullList();

	const listOfYearBooks = await pb.collection('books').getList(1, 100, {
		filter: `date_read >= "${2025}-01-01 00:00:00" && date_read <= "${2025}-12-31 23:59:59"`
	});

	// const currentMonthBooks = await pb.collection('books').getList(1, 50, { filter: filterString });
	const currentMonthBooks = await pb
		.collection('books')
		.getList(1, 50, {
			filter: `date_read >= "${2025}-07-01 00:00:00" && date_read <= "${2025}-07-30 23:59:59"`
		});

	const previousMonthBooks = await pb
		.collection('books')
		// .getList(1, 50, { filter: filterStringForPreviousMonth });
		.getList(1, 50, {
			filter: `date_read >= "${2025}-06-01 00:00:00" && date_read <= "${2025}-06-30 23:59:59"`
		});

	const currentMonthBooksCount = currentMonthBooks.items.length;
	const previousMonthBooksCount = previousMonthBooks.items.length;

	const latestBookRead = await pb.collection('books').getFirstListItem('', { sort: '-date_read' });

	const bookInfo = {
		listOfAllBooks: structuredClone(listOfAllBooks),
		listOfYearBooks: sanitizeListResult(listOfYearBooks),
		currentMonthBooksCount,
		previousMonthBooksCount,
		latestBookRead: structuredClone(latestBookRead)
	};

	return {
		auth,
		// auth: { user: null }, // safely fake
		bookInfo: {
			listOfAllBooks: [],
			listOfYearBooks: {
				page: 1,
				perPage: 1,
				totalItems: 0,
				totalPages: 1,
				items: []
			},
			currentMonthBooksCount: 0,
			previousMonthBooksCount: 0,
			latestBookRead: null
		},
		// bookInfo,
		dateInfo: {
			currentYear: 2025,
			currentMonthNum: 7,
			currentMonthString: 'July',
			day: 8,
			paramMonth: 'march',
			paramYear: 2025,
			previousMonthNum: 6,
			previousMonthString: 'June',
			year: 2025
		}
	};
};

// export const load: LayoutServerLoad = async (data) => {
// 	const adminEmail = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
// 	const adminPW = import.meta.env.VITE_POCKETBASE_ADMIN_PW;
// 	const auth = await adminLogin(adminEmail, adminPW);

// 	let paramYear: number | undefined = undefined;

// 	if (data.params.year) {
// 		paramYear = Number(data.params.year);
// 	}

// 	const paramMonth = data.params.month;

// 	const {
// 		filterString,
// 		filterStringForPreviousMonth,
// 		currentYear,
// 		year,
// 		day,
// 		currentMonthNum,
// 		currentMonthString,
// 		previousMonthNum,
// 		previousMonthString
// 	} = getCurrentDate(paramYear);

// 	if (!auth) fail(401, { error });

// 	const listOfAllBooks = await pb.collection('books').getFullList();

// 	const listOfYearBooks = await pb.collection('books').getList(1, 100, {
// 		filter: `date_read >= "${year}-01-01 00:00:00" && date_read <= "${year}-12-31 23:59:59"`
// 	});

// 	const currentMonthBooks = await pb.collection('books').getList(1, 50, { filter: filterString });
// 	const previousMonthBooks = await pb
// 		.collection('books')
// 		.getList(1, 50, { filter: filterStringForPreviousMonth });

// 	const currentMonthBooksCount = currentMonthBooks.items.length;
// 	const previousMonthBooksCount = previousMonthBooks.items.length;

// 	const latestBookRead = await pb.collection('books').getFirstListItem('', { sort: '-date_read' });

// 	const bookInfo = {
// 		listOfAllBooks: structuredClone(listOfAllBooks),
// 		listOfYearBooks: sanitizeListResult(listOfYearBooks),
// 		currentMonthBooksCount,
// 		previousMonthBooksCount,
// 		latestBookRead: structuredClone(latestBookRead)
// 	};

// 	const returnDataObject = {
// 		auth,
// 		bookInfo,
// 		dateInfo: {
// 			currentYear,
// 			currentMonthNum,
// 			currentMonthString,
// 			day,
// 			paramMonth,
// 			paramYear,
// 			previousMonthNum,
// 			previousMonthString,
// 			year
// 		}
// 	};

// 	console.log('Return Data Object:', returnDataObject);

// 	return {
// 		auth,
// 		bookInfo,
// 		dateInfo: {
// 			currentYear,
// 			currentMonthNum,
// 			currentMonthString,
// 			day,
// 			paramMonth,
// 			paramYear,
// 			previousMonthNum,
// 			previousMonthString,
// 			year
// 		},
// 	};
// };

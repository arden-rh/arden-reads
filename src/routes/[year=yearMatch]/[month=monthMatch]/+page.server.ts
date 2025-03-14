import pb from '$lib/pocketbase';
import { months } from '$lib/data/months';
import { compareMonth } from '$lib/functions/compareMonth';
import { error } from '@sveltejs/kit';
import { tryingToAccessTheFuture } from '../../../states.svelte';

import type { PageServerLoad } from './$types';
import type { ListResult, RecordModel } from 'pocketbase';

export const load: PageServerLoad = async ({ params }) => {
	const monthMatch = months.find((month) => month.name === params.month);

	function createFilterString(monthNumber: number, year: number) {
		let firstDayOfMonth: string;
		if (monthNumber < 10) {
			firstDayOfMonth = `${year}-0${monthNumber}-01`;
		} else {
			firstDayOfMonth = `${year}-${monthNumber}-01`;
		}

		let lastDayOfMonth: string;

		if (
			monthNumber === 1 ||
			monthNumber === 3 ||
			monthNumber === 5 ||
			monthNumber === 7 ||
			monthNumber === 8 ||
			monthNumber === 10 ||
			monthNumber === 12
		) {
			if (monthNumber < 10) {
				lastDayOfMonth = `${year}-0${monthNumber}-31`;
			} else {
				lastDayOfMonth = `${year}-${monthNumber}-31`;
			}
		} else if (monthNumber === 2) {
			lastDayOfMonth = `${year}-0${monthNumber}-28`;
		} else {
			if (monthNumber < 10) {
				lastDayOfMonth = `${year}-0${monthNumber}-30`;
			} else {
				lastDayOfMonth = `${year}-${monthNumber}-30`;
			}
		}

		return `date_read >= "${firstDayOfMonth} 00:00:00" && date_read <= "${lastDayOfMonth} 23:59:59"`;
	}

	if (!monthMatch) {
		return {
			status: 404,
			error: new Error('Invalid month')
		};
	}

	const filterString = createFilterString(monthMatch.number, Number(params.year));

	let monthBookList: ListResult<RecordModel> | undefined = undefined;
	let favouriteBook: ListResult<RecordModel> | undefined = undefined;

	const getMonthBooks = async (filterString: string) => {
		console.log('filterString', filterString);
		return await pb.collection('books').getList(1, 50, { filter: filterString, requestKey: null });
	};

	try {
		monthBookList = await getMonthBooks(filterString);
	} catch (error) {
		console.error('Month book list not found', error);
	}

	if (!monthBookList) {
		throw error(404, 'Data not found');
	}

	try {
		// const favouriteBook = await pb.collection('books').getList(1, 1, {filter: `${filterString} && favourite_book_per_month = true`, skipTotal: true});
		favouriteBook = await pb
			.collection('books')
			// .getList(1, 1, { filter: `${filterString}`});
			.getList(1, 1, { filter: `${filterString} && favourite_book_per_month = true`, skipTotal: true, requestKey: null });


		// favouriteBook = await pb
		// 	.collection('books')
		// 	.getFirstListItem('favourite_book_per_month=true', {
		// 		filter: filterString
		// 	});

		console.log('favouriteBook', favouriteBook);
	} catch (error) {
		console.error('Favourite book not found', error);
	}

	// const favouriteBook = await pb.collection('books').getList(1, 1, {filter: `${filterString} && favourite_book_per_month = true`, skipTotal: true});
	// console.log('favouriteBook', favouriteBook);

	const todaysDate = new Date();
	const currentYear = todaysDate.getFullYear();
	const currentMonthIndex = todaysDate.getMonth();
	const monthIndex = compareMonth(params.month);

	if (monthIndex === undefined) {
		throw error(404, 'No month index found');
	}

	tryingToAccessTheFuture.futureDate =
		monthIndex > currentMonthIndex && Number(params.year) === currentYear;

	// const favouriteBook = {
	// 	items: [
	// 		{
	// 			author: 'Jason Aaron',
	// 			collectionId: 'aimd4fys7caqp9n',
	// 			collectionName: 'books',
	// 			date_read: '2025-02-21 00:00:00.000Z',
	// 			favourite_book_per_month: false,
	// 			formats: ['hej'],
	// 			genres: ['hej'],
	// 			id: 'vtq31972y7hgfxq',
	// 			minutes: 0,
	// 			owned: false,
	// 			pages: 136,
	// 			title: 'Star Wars: Darth Vader - Black, White & Red',
	// 			created: '2021-02-21 00:00:00.000Z',
	// 			updated: '2021-02-21 00:00:00.000Z'
	// 		}
	// 	],
	// 	page: 1,
	// 	perPage: 50,
	// 	totalItems: 14,
	// 	totalPages: 1
	// };

	return {
		monthBookList,
		favouriteBook
	};
};

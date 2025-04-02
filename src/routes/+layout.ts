import { error } from '@sveltejs/kit';

// Functions
import { createBookList, createBookListFromListResult } from '$lib/functions/createBookList';
import { createBookFromRecord } from '$lib/functions/createBook';
import { getSumOfNumericProperty } from '$lib/functions/getSumOfNumericProperty';
import { getAllAuthors, getAllFormats, getAllGenres } from '$lib/functions/getBookInfo';

import type { LayoutLoad } from './$types';
import { currentParams } from '../states.svelte';

/** TODO
 * - Create array of all months with the amount of books read in each month
 * - Create functionality to check if 0 books were read in a month to be able to disable month in Calendar
 */

export const load: LayoutLoad = async ({ data }) => {
	if (!data) error(404, { message: 'No data found' });

	const { bookInfo, dateInfo } = data;

	if (!bookInfo || !dateInfo) error(404, { message: 'Book and/or date data not found' });

	const { listOfAllBooks, listOfYearBooks, currentMonthBooks, previousMonthBooks, latestBookRead } = bookInfo;

	const allBooks = createBookList(listOfAllBooks);
	const yearBooks = createBookListFromListResult(listOfYearBooks);
	const latestBook = createBookFromRecord(latestBookRead);
	const amountOfBooksCurrentMonth = currentMonthBooks.items.length;

	const { authors, amountOfUniqueAuthors } = getAllAuthors(allBooks);
	const { genres, amountOfGenres } = getAllGenres(allBooks);
	const { formats, amountOfFormats } = getAllFormats(allBooks);

	const { authors: yearAuthors, amountOfUniqueAuthors: yearAmountOfUniqueAuthors } = getAllAuthors(yearBooks);
	const { genres: yearGenres, amountOfGenres: yearAmountOfGenres } = getAllGenres(yearBooks);
	const { formats: yearFormats, amountOfFormats: yearAmountOfFormats } = getAllFormats(yearBooks);

	const totalPagesRead = getSumOfNumericProperty(allBooks, 'pages');
	const minutesListened = getSumOfNumericProperty(allBooks, 'minutes');

	const totalPagesReadYear = getSumOfNumericProperty(yearBooks, 'pages');
	const minutesListenedYear = getSumOfNumericProperty(yearBooks, 'minutes');

	currentParams.month = dateInfo.paramMonth;
	currentParams.year = dateInfo.paramYear;

	return {
		metaData: {
			title: 'Arden Reads',
			description: 'A place to keep track of all the books that Arden reads and listens to, showing stats for separate months and years.',
			url: 'https://www.arden-reads.com',

		},
		...dateInfo,
		yearStats: {
			yearBooks,
			yearAmountOfFormats,
			yearAmountOfGenres,
			yearAmountOfUniqueAuthors,
			yearAuthors,
			yearFormats,
			yearGenres,
			minutesListenedYear,
			totalPagesReadYear
		},
		allTimeStats: {
			allBooks,
			amountOfFormats,
			amountOfGenres,
			amountOfUniqueAuthors,
			authors,
			formats,
			genres,
			minutesListened,
			totalPagesRead
		},
		currentMonthBooks,
		amountOfBooksCurrentMonth,
		previousMonthBooks,
		latestBook
	};
};

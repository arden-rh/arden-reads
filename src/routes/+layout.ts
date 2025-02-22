import { error } from '@sveltejs/kit';

// Functions
import { createBookList, createYearBookList } from '$lib/functions/createBookList';
import { getSumOfNumericProperty } from '$lib/functions/getSumOfNumericProperty';
import { getAllAuthors, getAllFormats, getAllGenres } from '$lib/functions/getBookInfo';

import type { LayoutLoad } from './$types';
import { currentParams } from '../states.svelte';

export const load: LayoutLoad = async ({ data }) => {
	if (!data) error(404, { message: 'No data found' });

	const { bookInfo, dateInfo, isLoggedIn } = data;

	if (!isLoggedIn) error(401, { message: 'Not logged in' });

	if (!bookInfo || !dateInfo) error(404, { message: 'Book and/or date not found' });

	const { listOfAllBooks, listOfYearBooks, monthBooks } = bookInfo;

	const allBooks = createBookList(listOfAllBooks);
	const yearBooks = createYearBookList(listOfYearBooks);

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
		isLoggedIn,
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
			monthBooks,
			totalPagesRead
		},
		monthBooks
	};
};

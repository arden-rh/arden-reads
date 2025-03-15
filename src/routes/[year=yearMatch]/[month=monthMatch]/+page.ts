import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Book } from '$lib/types/book.types';

// Functions
import { createBookList } from '$lib/functions/createBookList';
import { createBookFromList } from '$lib/functions/createBook';
import { getAllAuthors, getAllFormats, getAllGenres } from "$lib/functions/getBookInfo";

export const load: PageLoad = async ({ data }) => {
	
	const { monthBookList, favouriteBook, futureDate } = data;
	let favouriteBookInfo: Book | undefined;

	if (!monthBookList) throw error(404, { message: 'Books not found' });

	if (!favouriteBook) {
		favouriteBookInfo = undefined;
	} else {
		favouriteBookInfo = createBookFromList(favouriteBook);
	}

	const books = createBookList(monthBookList.items);

	const { authors, amountOfUniqueAuthors } = getAllAuthors(books);
	const { genres } = getAllGenres(books);
	const { formats } = getAllFormats(books);

	return {
		monthBookInfo: {
			books,
			amountOfUniqueAuthors,
			authors,
			formats,
			genres,
			favouriteBook: favouriteBookInfo
		},
		futureDate
	};
};

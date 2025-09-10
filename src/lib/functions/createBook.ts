import type { Book } from '$lib/types/book.types';
import type { ListResult, RecordModel } from 'pocketbase';

export const createBookFromList = (bookInfo: ListResult<RecordModel>): Book => {
	const bookList: Book[] = bookInfo.items.map((book) => {
		const {
			title,
			author,
			date_read,
			id,
			genres,
			formats,
			minutes,
			owned,
			pages,
			favourite_book_per_month
		} = book;
		return {
			title,
			author,
			date_read,
			id,
			genres,
			formats,
			minutes,
			owned,
			pages,
			favourite_book_per_month
		};
	});

	return bookList[0];
};

export const createBookFromRecord = (book: RecordModel): Book => {
	const {
		title,
		author,
		date_read,
		id,
		genres,
		formats,
		minutes,
		owned,
		pages,
		favourite_book_per_month
	} = book;
	return {
		title,
		author,
		date_read,
		id,
		genres,
		formats,
		minutes,
		owned,
		pages,
		favourite_book_per_month
	};
};

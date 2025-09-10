import type { Book } from '$lib/types/book.types';
import type { ListResult, RecordModel } from 'pocketbase';

export const createBookList = (listOfBooks: RecordModel[]) => {
	const bookList: Book[] = listOfBooks.map((book) => {
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

	return bookList;
};

export const createBookListFromListResult = (listOfBooks: ListResult<RecordModel>) => {
	const bookList: Book[] = listOfBooks.items.map((book) => {
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

	return bookList;
};

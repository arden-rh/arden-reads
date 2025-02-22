import type { Book } from '$lib/types/book.types';

export const getSumOfNumericProperty = <K extends keyof Book>(
	bookList: Book[],
	key: K & (Book[K] extends number ? K : never)
): number => {
	const sumOfNum = bookList.reduce(
		(total: number, book: Book) => total + ((book[key] as number) || 0),
		0
	);
	return sumOfNum;
};

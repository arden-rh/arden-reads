import type { Book } from "$lib/types/book.types";

export function countBooksByMonth(books: Book[]): Record<string, number> {
	const booksByMonth = books.reduce(
		(acc, book) => {
			const bookDate = new Date(book.date_read);
			const yearMonth = `${bookDate.getFullYear()}-${String(bookDate.getMonth() + 1).padStart(2, '0')}`;
			acc[yearMonth] = (acc[yearMonth] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>
	);

	const sortedBooksByMonth = Object.entries(booksByMonth).sort(([a], [b]) => {
		const [yearA, monthA] = a.split('-').map(Number);
		const [yearB, monthB] = b.split('-').map(Number);
		return yearA === yearB ? monthA - monthB : yearA - yearB;
	});

	return Object.fromEntries(
		sortedBooksByMonth.map(([key, value]) => {
			return [key, value];
		})
	);
};
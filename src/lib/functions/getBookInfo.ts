import type { Book } from '$lib/types/book.types';

export const getAllAuthors = (allBooks: Book[]) => {
	const allAuthorEntries = allBooks.map((book: Book) => book.author);
	const allAuthors = allAuthorEntries
		.map((authors: string) => authors.split(','))
		.flat()
		.map((author: string) => author.trim());
	const unsortedAuthors = [...new Set(allAuthors)];
	const authors = unsortedAuthors.sort((a, b) => a.localeCompare(b));
	const amountOfUniqueAuthors = authors.length;
	return { amountOfUniqueAuthors, authors };
};

export const getAllFormats = (allBooks: Book[]) => {
	const formattedFormats = allBooks
		.flatMap((book: Book) => book.formats)
		.map((format: string) => format.replace(/_/g, ' '));
	const unsortedFormats = [...new Set(formattedFormats.map((format: string) => format))];
	const formats = unsortedFormats.sort();
	const amountOfFormats = formats.length;
	return { formats, amountOfFormats };
};

export const getAllGenres = (allBooks: Book[]) => {
	const formattedGenres = allBooks.flatMap((book: Book) => book.genres);
	const unsortedGenres = [...new Set(formattedGenres.map((genre: string) => genre))];
	const genres = unsortedGenres.sort();
	const amountOfGenres = genres.length;
	return { genres, amountOfGenres };
};

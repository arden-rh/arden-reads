// Type definition for Book
export interface Book {
	id: string;
	author: string;
	date_read: Date;
	favourite_book_per_month: boolean;
	formats: string[];
	genres: string[];
	minutes: number;
	owned: boolean;
	pages: number;
	title: string;
}

export type NewBook = Omit<Book, 'id'>;

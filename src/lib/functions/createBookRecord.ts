export function createBookRecord(data: FormData) {
	const formats = JSON.parse(data.get('formats') as string) as string[];
	const genres = JSON.parse(data.get('genres') as string) as string[];
	const minutes = Number(data.get('minutes'));
	const pages = Number(data.get('pages'));
	const date = data.get('date') as string;
	const date_read = new Date(date);
	const todaysDate = new Date();

	if (!data.get('title')) {
		throw new Error('Title is required.');
	};
	if (!data.get('author')) {
		throw new Error('Author is required.');
	};
	if (!data.get('date')) {
		throw new Error('Date is required.');
	};
	if (!formats.length) {
		throw new Error('Formats is required.');
	};
	if (!genres.length) {
		throw new Error('Genres is required.');
	}

	if (isNaN(date_read.getTime())) {
		throw new Error('Date read must be a valid date.')
	};

	if (isNaN(minutes)) {
		throw new Error('Minutes must be a number.');
	} else if (minutes < 0) {
		throw new Error('Minutes must be a positive number.');
	};

	if (isNaN(pages)) {
		throw new Error('Pages must be a number.');
	} else if (pages < 0) {
		throw new Error('Pages must be a positive number.');
	};

	if (pages && minutes) {
		throw new Error('You can only enter either pages or minutes, not both.');
	};

	if (date_read > todaysDate) {
		throw new Error('Date read must be in the past.');
	};

	if (formats.includes('audio_book') && (!minutes || minutes < 1)) {
		throw new Error('Minutes are required for Audio books.');
	};

	if (!formats.includes('audio_book') && !pages) {
		throw new Error('Pages are required for everything except Audio books.');
	};

	if (formats.includes('audio_book') && pages) {
		throw new Error('Audio books cannot have pages.');
	};

	if (formats.includes('audio_book') && formats.length > 1) {
		throw new Error('Audio books cannot have any other formats.');
	};

	const newBook = {
		title: data.get('title'),
		author: data.get('author'),
		date_read,
		favourite_book_per_month: data.get('favourite_book_per_month') === 'yes',
		formats,
		genres,
		minutes,
		owned: data.get('owned') === 'yes',
		pages
	};

	return newBook;
};
export const getCurrentDate = (paramYear?: number) => {
	const date = new Date();
	const day = date.getDate();
	const currentYear = date.getFullYear();
	let year = currentYear;

	if (paramYear) {
		year = paramYear;
	}
	
	let previousMonthNum = date.getMonth();
	const currentMonthNum = date.getMonth() + 1;

	let lastDayOfMonth: string;
	let firstDayOfMonth: string;
	let monthNumber: number;
	let monthString: string;
	let previousMonthDate: Date;

	if (currentMonthNum === 1) {
		previousMonthNum = 1;
		previousMonthDate = new Date(`2025-0${previousMonthNum}-01`);
	} else if (currentMonthNum < 10) {
		previousMonthDate = new Date(`2025-0${previousMonthNum}-01`);
	} else {
		previousMonthDate = new Date(`2025-${previousMonthNum}-01`);
	}

	const currentMonthString = date.toLocaleString('default', { month: 'long' });
	const previousMonthString = previousMonthDate.toLocaleString('default', { month: 'long' });

	if (day <= 15) {
		monthNumber = previousMonthNum;
		monthString = previousMonthString;
		if (monthNumber < 10) {
			firstDayOfMonth = `${year}-0${monthNumber}-01`;
		} else {
			firstDayOfMonth = `${year}-${monthNumber}-01`;
		}
	} else {
		monthNumber = currentMonthNum;
		monthString = currentMonthString;
		if (monthNumber < 10) {
			firstDayOfMonth = `${year}-0${monthNumber}-01`;
		} else {
			firstDayOfMonth = `${year}-${monthNumber}-01`;
		}
	}

	if (
		monthNumber === 1 ||
		monthNumber === 3 ||
		monthNumber === 5 ||
		monthNumber === 7 ||
		monthNumber === 8 ||
		monthNumber === 10 ||
		monthNumber === 12
	) {
		if (monthNumber < 10) {
			lastDayOfMonth = `${year}-0${monthNumber}-31`;
		} else {
			lastDayOfMonth = `${year}-${monthNumber}-31`;
		}
	} else if (monthNumber === 2) {
		lastDayOfMonth = `${year}-0${monthNumber}-28`;
	} else {
		if (monthNumber < 10) {
			lastDayOfMonth = `${year}-0${monthNumber}-30`;
		} else {
			lastDayOfMonth = `${year}-${monthNumber}-30`;
		}
	}

	const filterString = `date_read >= "${firstDayOfMonth} 00:00:00" && date_read <= "${lastDayOfMonth} 23:59:59"`;

	return { day, currentYear, year, monthString, filterString, monthNumber };
};

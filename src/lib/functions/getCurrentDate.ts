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

	let firstDayOfMonth: string;
	let lastDayOfMonth: string;
	let firstDayOfPreviousMonth: string;
	let lastDayOfPreviousMonth: string;
	let previousMonthDate: Date;

	if (currentMonthNum === 1) {
		previousMonthNum = 1;
		previousMonthDate = new Date(`2025-0${previousMonthNum}-01`);
		firstDayOfPreviousMonth = `2025-01-01`;
	} else if (currentMonthNum <= 10) {
		previousMonthDate = new Date(`${year}-0${previousMonthNum}-01`);
		firstDayOfPreviousMonth = `${year}-0${previousMonthNum}-01`;
	} else {
		previousMonthDate = new Date(`${year}-${previousMonthNum}-01`);
		firstDayOfPreviousMonth = `${year}-${previousMonthNum}-01`;
	}

	const currentMonthString = date.toLocaleString('default', { month: 'long' });
	const previousMonthString = previousMonthDate.toLocaleString('default', { month: 'long' });

	if (currentMonthNum < 10) {
		firstDayOfMonth = `${year}-0${currentMonthNum}-01`;
	} else {
		firstDayOfMonth = `${year}-${currentMonthNum}-01`;
	}

	if (
		currentMonthNum === 1 ||
		currentMonthNum === 3 ||
		currentMonthNum === 5 ||
		currentMonthNum === 7 ||
		currentMonthNum === 8 ||
		currentMonthNum === 10 ||
		currentMonthNum === 12
	) {
		if (currentMonthNum < 10) {
			lastDayOfMonth = `${year}-0${currentMonthNum}-31`;
			lastDayOfPreviousMonth = `${year}-0${previousMonthNum}-30`;

			if (currentMonthNum === 1 || currentMonthNum === 8) {
				lastDayOfPreviousMonth = `${year}-0${previousMonthNum}-31`;
			}

			if (currentMonthNum === 3) {
				lastDayOfPreviousMonth = `${year}-0${previousMonthNum}-28`;
			}
		} else {
			lastDayOfMonth = `${year}-${currentMonthNum}-31`;
			lastDayOfPreviousMonth = `${year}-${previousMonthNum}-30`;
		}
	} else if (currentMonthNum === 2) {
		lastDayOfMonth = `${year}-0${currentMonthNum}-28`;
		lastDayOfPreviousMonth = `${year}-0${previousMonthNum}-31`;
	} else {
		if (currentMonthNum > 10) {
			lastDayOfMonth = `${year}-${currentMonthNum}-30`;
			lastDayOfPreviousMonth = `${year}-${previousMonthNum}-31`;
		} else {
			lastDayOfMonth = `${year}-0${currentMonthNum}-30`;
			lastDayOfPreviousMonth = `${year}-0${previousMonthNum}-31`;
		}
	}

	const filterString = `date_read >= "${firstDayOfMonth} 00:00:00" && date_read <= "${lastDayOfMonth} 23:59:59"`;
	const filterStringForPreviousMonth = `date_read >= "${firstDayOfPreviousMonth} 00:00:00" && date_read <= "${lastDayOfPreviousMonth} 23:59:59"`;

	return {
		day,
		currentYear,
		year,
		currentMonthString,
		filterString,
		filterStringForPreviousMonth,
		currentMonthNum,
		previousMonthString,
		previousMonthNum
	};
};

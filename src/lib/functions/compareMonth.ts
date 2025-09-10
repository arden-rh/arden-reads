import { months } from '$lib/data/months';

export const compareMonth = (month: string) => {
	const currentMonth = months.find((m) => m.name === month);

	return currentMonth?.index;
};

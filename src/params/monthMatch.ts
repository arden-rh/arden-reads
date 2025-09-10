import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (
	param: string
): param is
	| 'january'
	| 'february'
	| 'march'
	| 'april'
	| 'may'
	| 'june'
	| 'july'
	| 'august'
	| 'september'
	| 'october'
	| 'november'
	| 'december' => {
	return (
		param === 'january' ||
		param === 'february' ||
		param === 'march' ||
		param === 'april' ||
		param === 'may' ||
		param === 'june' ||
		param === 'july' ||
		param === 'august' ||
		param === 'september' ||
		param === 'october' ||
		param === 'november' ||
		param === 'december'
	);
};

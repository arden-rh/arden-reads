import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {

	const { year } = params;

	return {
		metaData: {
			title: 'Arden Reads | Books read in ' + year,
			description: `Books read by Arden in ${year}.`,
			url: `https://www.arden-reads.com/${year}`,
		},
		year
	};
};

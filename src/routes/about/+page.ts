import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = async () => {
	return {
		metaData: {
			title: 'Arden Reads | About',
			description: `A brief description about who Arden, and what this project, is.`,
			url: `https://www.arden-reads.com/about`
		}
	};
};

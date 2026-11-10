import { defineParams } from '@sveltejs/kit/params';
import { match as monthMatch } from './monthMatch.ts';
import { match as yearMatch } from './yearMatch.ts';

export const params = defineParams({
	monthMatch,
	yearMatch
});

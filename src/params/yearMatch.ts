import type { ParamMatcher } from "@sveltejs/kit";

export const match : ParamMatcher = (param: string ): param is ('2024' | '2025') => {
	return param === '2024' || param === '2025';
};
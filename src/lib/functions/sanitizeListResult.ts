import type { ListResult } from "pocketbase";

// ignore the no-explicit-any rule here, as we are sanitizing the result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanitizeListResult<T>(result: ListResult<T>): ListResult<any> {
	return {
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages,
		items: structuredClone(result.items)
	};
}
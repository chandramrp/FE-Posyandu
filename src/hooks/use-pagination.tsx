import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], limit = 10) {
	const [page, setPage] = useState(1);

	const total = data.length;
	const totalPages = Math.max(1, Math.ceil(total / limit));

	// Reset to page 1 if current page exceeds totalPages (e.g. after search/filter)
	const safePage = page > totalPages ? 1 : page;
	if (safePage !== page) setPage(safePage);

	const paginatedData = useMemo(() => {
		const start = (safePage - 1) * limit;
		return data.slice(start, start + limit);
	}, [data, safePage, limit]);

	return {
		page: safePage,
		setPage,
		limit,
		total,
		totalPages,
		paginatedData,
	};
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface DataPaginationProps {
	page: number;
	totalPages: number;
	total: number;
	limit: number;
	onPageChange: (page: number) => void;
}

export default function DataPagination({
	page,
	totalPages,
	total,
	limit,
	onPageChange,
}: DataPaginationProps) {
	const start = (page - 1) * limit + 1;
	const end = Math.min(page * limit, total);

	const pageNumbers = useMemo(() => {
		const pages: (number | "...")[] = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);
			if (page > 3) pages.push("...");
			for (
				let i = Math.max(2, page - 1);
				i <= Math.min(totalPages - 1, page + 1);
				i++
			) {
				pages.push(i);
			}
			if (page < totalPages - 2) pages.push("...");
			pages.push(totalPages);
		}
		return pages;
	}, [page, totalPages]);

	if (total === 0) return null;

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
			<p className="text-sm text-muted-foreground">
				Menampilkan {start}–{end} dari {total} data
			</p>
			<div className="flex items-center gap-1">
				<button
					onClick={() => onPageChange(page - 1)}
					disabled={page <= 1}
					className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40">
					<ChevronLeft className="h-4 w-4" />
					<span className="hidden sm:inline">Previous</span>
				</button>

				{pageNumbers.map((p, i) =>
					p === "..." ? (
						<span
							key={`ellipsis-${i}`}
							className="px-2 text-muted-foreground text-sm">
							…
						</span>
					) : (
						<button
							key={p}
							onClick={() => onPageChange(p)}
							className={`min-w-[2rem] rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
								p === page
									? "bg-primary text-primary-foreground"
									: "text-foreground hover:bg-muted"
							}`}>
							{p}
						</button>
					),
				)}

				<button
					onClick={() => onPageChange(page + 1)}
					disabled={page >= totalPages}
					className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40">
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}

import { Search, Eye, Link } from "lucide-react";
import { useState } from "react";
import DataPagination from "@/components/DataPagination";
import { usePagination } from "@/hooks/use-pagination";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { NavLink } from "react-router-dom";

const pemeriksaanData = [
	{
		id: 1,
		namaIbu: "Sari Dewi",
		tanggal: "15 Feb 2026",
		usiaKehamilan: "28 minggu",
		tensi: "120/80",
		status: "Normal",
	},
	{
		id: 2,
		namaIbu: "Rina Wulandari",
		tanggal: "15 Feb 2026",
		usiaKehamilan: "20 minggu",
		tensi: "118/78",
		status: "Normal",
	},
	{
		id: 3,
		namaIbu: "Nur Hidayah",
		tanggal: "14 Feb 2026",
		usiaKehamilan: "12 minggu",
		tensi: "130/90",
		status: "Perlu Perhatian",
	},
	{
		id: 4,
		namaIbu: "Lina Marlina",
		tanggal: "14 Feb 2026",
		usiaKehamilan: "32 minggu",
		tensi: "115/75",
		status: "Normal",
	},
	{
		id: 5,
		namaIbu: "Fitri Handayani",
		tanggal: "13 Feb 2026",
		usiaKehamilan: "24 minggu",
		tensi: "125/85",
		status: "Perlu Perhatian",
	},
];

export default function PemeriksaanIbuHamil() {
	const [search, setSearch] = useState("");
	const filtered = pemeriksaanData.filter((p) =>
		p.namaIbu.toLowerCase().includes(search.toLowerCase()),
	);

	const { page, setPage, limit, total, totalPages, paginatedData } =
		usePagination(filtered);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-foreground">
					Pemeriksaan Ibu Hamil
				</h2>
				<p className="text-muted-foreground">
					Daftar hasil pemeriksaan ibu hamil
				</p>
			</div>

			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Cari nama ibu..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
				/>
			</div>

			<div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Nama Ibu
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Tanggal
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Usia Kehamilan
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Tensi
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Status
								</th>
								<th className="px-4 py-3 text-center font-semibold text-foreground">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedData.map((p) => (
								<tr
									key={p.id}
									className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
									<td className="px-4 py-3 font-medium text-foreground">
										{p.namaIbu}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.tanggal}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.usiaKehamilan}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.tensi}
									</td>
									<td className="px-4 py-3">
										<span
											className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
												p.status === "Normal"
													? "bg-success/10 text-success"
													: "bg-warning/10 text-warning"
											}`}>
											{p.status}
										</span>
									</td>
									<NavLink
										to={`/data-ibu-hamil/${p.id}`}
										className="rounded-lg p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
										<Eye className="h-4 w-4" />
									</NavLink>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<DataPagination
				page={page}
				totalPages={totalPages}
				total={total}
				limit={limit}
				onPageChange={setPage}
			/>
		</div>
	);
}

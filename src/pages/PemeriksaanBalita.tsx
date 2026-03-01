import { Stethoscope, Search, Eye, Link } from "lucide-react";
import { useState } from "react";
import DataPagination from "@/components/DataPagination";
import { usePagination } from "@/hooks/use-pagination";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { NavLink } from "react-router-dom";

const pemeriksaanData = [
	{
		id: 1,
		namaBalita: "Aisyah Putri",
		tanggal: "15 Feb 2026",
		berat: "9.5 kg",
		tinggi: "72 cm",
		status: "Normal",
	},
	{
		id: 2,
		namaBalita: "Rizki Ahmad",
		tanggal: "15 Feb 2026",
		berat: "10.2 kg",
		tinggi: "76 cm",
		status: "Normal",
	},
	{
		id: 3,
		namaBalita: "Siti Nuraini",
		tanggal: "14 Feb 2026",
		berat: "8.1 kg",
		tinggi: "67 cm",
		status: "Perlu Perhatian",
	},
	{
		id: 4,
		namaBalita: "Budi Santoso",
		tanggal: "14 Feb 2026",
		berat: "11.0 kg",
		tinggi: "78 cm",
		status: "Normal",
	},
	{
		id: 5,
		namaBalita: "Dewi Lestari",
		tanggal: "13 Feb 2026",
		berat: "7.8 kg",
		tinggi: "65 cm",
		status: "Perlu Perhatian",
	},
	{
		id: 6,
		namaBalita: "Fajar Ramadan",
		tanggal: "13 Feb 2026",
		berat: "12.5 kg",
		tinggi: "85 cm",
		status: "Normal",
	},
	{
		id: 7,
		namaBalita: "Zahra Amelia",
		tanggal: "12 Feb 2026",
		berat: "6.5 kg",
		tinggi: "60 cm",
		status: "Normal",
	},
];

export default function PemeriksaanBalita() {
	const [search, setSearch] = useState("");
	const filtered = pemeriksaanData.filter((p) =>
		p.namaBalita.toLowerCase().includes(search.toLowerCase()),
	);

	const { page, setPage, limit, total, totalPages, paginatedData } =
		usePagination(filtered);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-foreground">
					Pemeriksaan Balita
				</h2>
				<p className="text-muted-foreground">
					Daftar hasil pemeriksaan balita
				</p>
			</div>

			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Cari nama balita..."
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
									Nama Balita
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Tanggal
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Berat
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Tinggi
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
										{p.namaBalita}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.tanggal}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.berat}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{p.tinggi}
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

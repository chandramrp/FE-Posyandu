import { useState, useMemo } from "react";
import { FileDown, FileSpreadsheet, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/use-pagination";
import DataPagination from "@/components/DataPagination";

// --- Mock Data Balita ---
const laporanBalitaData = [
	{
		nama: "Aisyah Putri",
		umur: "23 bln",
		berat: "9.5 kg",
		tinggi: "72 cm",
		lingkarKepala: "44 cm",
		status: "Normal",
	},
	{
		nama: "Rizki Ahmad",
		umur: "27 bln",
		berat: "10.2 kg",
		tinggi: "76 cm",
		lingkarKepala: "45 cm",
		status: "Normal",
	},
	{
		nama: "Siti Nuraini",
		umur: "20 bln",
		berat: "8.1 kg",
		tinggi: "67 cm",
		lingkarKepala: "42 cm",
		status: "Gizi Kurang",
	},
	{
		nama: "Budi Santoso",
		umur: "30 bln",
		berat: "11.0 kg",
		tinggi: "78 cm",
		lingkarKepala: "46 cm",
		status: "Normal",
	},
	{
		nama: "Dewi Lestari",
		umur: "25 bln",
		berat: "7.8 kg",
		tinggi: "65 cm",
		lingkarKepala: "41 cm",
		status: "Gizi Kurang",
	},
	{
		nama: "Fajar Ramadan",
		umur: "34 bln",
		berat: "12.5 kg",
		tinggi: "85 cm",
		lingkarKepala: "47 cm",
		status: "Normal",
	},
	{
		nama: "Alya Zahra",
		umur: "18 bln",
		berat: "8.8 kg",
		tinggi: "70 cm",
		lingkarKepala: "43 cm",
		status: "Normal",
	},
	{
		nama: "Hasan Ali",
		umur: "28 bln",
		berat: "9.0 kg",
		tinggi: "73 cm",
		lingkarKepala: "44 cm",
		status: "Gizi Kurang",
	},
	{
		nama: "Nadia Putri",
		umur: "22 bln",
		berat: "9.2 kg",
		tinggi: "71 cm",
		lingkarKepala: "43 cm",
		status: "Normal",
	},
	{
		nama: "Rafi Pratama",
		umur: "32 bln",
		berat: "11.5 kg",
		tinggi: "80 cm",
		lingkarKepala: "46 cm",
		status: "Normal",
	},
	{
		nama: "Zahra Amelia",
		umur: "19 bln",
		berat: "7.5 kg",
		tinggi: "66 cm",
		lingkarKepala: "41 cm",
		status: "Gizi Kurang",
	},
	{
		nama: "Dimas Arya",
		umur: "36 bln",
		berat: "13.0 kg",
		tinggi: "87 cm",
		lingkarKepala: "48 cm",
		status: "Normal",
	},
];

// --- Mock Data Ibu Hamil ---
const laporanIbuHamilData = [
	{
		nama: "Rina Marlina",
		usiaKehamilan: 18,
		berat: "62 kg",
		tinggi: "158 cm",
		tensi: "120/80",
		keterangan: "Kondisi baik",
	},
	{
		nama: "Sari Dewi",
		usiaKehamilan: 24,
		berat: "65 kg",
		tinggi: "155 cm",
		tensi: "110/70",
		keterangan: "Normal",
	},
	{
		nama: "Ani Suryani",
		usiaKehamilan: 32,
		berat: "70 kg",
		tinggi: "160 cm",
		tensi: "130/85",
		keterangan: "Tekanan darah tinggi",
	},
	{
		nama: "Lina Fitriani",
		usiaKehamilan: 12,
		berat: "55 kg",
		tinggi: "152 cm",
		tensi: "115/75",
		keterangan: "Normal",
	},
	{
		nama: "Maya Sari",
		usiaKehamilan: 28,
		berat: "68 kg",
		tinggi: "157 cm",
		tensi: "120/80",
		keterangan: "Kondisi baik",
	},
	{
		nama: "Dian Permata",
		usiaKehamilan: 36,
		berat: "72 kg",
		tinggi: "162 cm",
		tensi: "125/80",
		keterangan: "Siap persalinan",
	},
	{
		nama: "Yuni Astuti",
		usiaKehamilan: 20,
		berat: "58 kg",
		tinggi: "154 cm",
		tensi: "110/70",
		keterangan: "Normal",
	},
	{
		nama: "Ratna Sari",
		usiaKehamilan: 16,
		berat: "56 kg",
		tinggi: "156 cm",
		tensi: "118/78",
		keterangan: "Normal",
	},
	{
		nama: "Indah Permata",
		usiaKehamilan: 30,
		berat: "67 kg",
		tinggi: "159 cm",
		tensi: "122/82",
		keterangan: "Kontrol rutin",
	},
	{
		nama: "Fitri Handayani",
		usiaKehamilan: 22,
		berat: "60 kg",
		tinggi: "155 cm",
		tensi: "115/75",
		keterangan: "Normal",
	},
	{
		nama: "Wulan Dari",
		usiaKehamilan: 26,
		berat: "64 kg",
		tinggi: "158 cm",
		tensi: "120/80",
		keterangan: "Kondisi baik",
	},
];

const bulanOptions = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

type TabType = "balita" | "ibu-hamil";

export default function Laporan() {
	const [activeTab, setActiveTab] = useState<TabType>("balita");
	const [bulan, setBulan] = useState("Februari");
	const [tahun, setTahun] = useState("2026");
	const [exportingPdf, setExportingPdf] = useState(false);
	const [exportingExcel, setExportingExcel] = useState(false);

	const currentData =
		activeTab === "balita" ? laporanBalitaData : laporanIbuHamilData;
	const { page, setPage, limit, total, totalPages, paginatedData } =
		usePagination(currentData as Record<string, unknown>[], 10);

	// --- Stats ---
	const stats = useMemo(() => {
		if (activeTab === "balita") {
			const normal = laporanBalitaData.filter(
				(d) => d.status === "Normal",
			).length;
			const kurang = laporanBalitaData.filter(
				(d) => d.status === "Gizi Kurang",
			).length;
			return {
				total: laporanBalitaData.length,
				baik: normal,
				perhatian: kurang,
				labelBaik: "Gizi Normal",
				labelPerhatian: "Gizi Kurang",
			};
		}
		const normal = laporanIbuHamilData.filter(
			(d) => !d.keterangan.toLowerCase().includes("tinggi"),
		).length;
		const perhatian = laporanIbuHamilData.filter((d) =>
			d.keterangan.toLowerCase().includes("tinggi"),
		).length;
		return {
			total: laporanIbuHamilData.length,
			baik: normal,
			perhatian,
			labelBaik: "Kondisi Baik",
			labelPerhatian: "Perlu Perhatian",
		};
	}, [activeTab]);

	// --- Export PDF ---
	const handleExportPdf = () => {
		setExportingPdf(true);
		try {
			const doc = new jsPDF({ orientation: "landscape" });
			const now = new Date();
			const title =
				activeTab === "balita"
					? "Laporan Pemeriksaan Balita"
					: "Laporan Pemeriksaan Ibu Hamil";
			doc.setFontSize(18);
			doc.text(title, 148, 20, { align: "center" });
			doc.setFontSize(12);
			doc.text(`Bulan: ${bulan} ${tahun}`, 148, 30, { align: "center" });

			if (activeTab === "balita") {
				autoTable(doc, {
					startY: 40,
					head: [
						[
							"No",
							"Nama Balita",
							"Umur",
							"Berat",
							"Tinggi",
							"Lingkar Kepala",
							"Status Gizi",
						],
					],
					body: laporanBalitaData.map((d, i) => [
						i + 1,
						d.nama,
						d.umur,
						d.berat,
						d.tinggi,
						d.lingkarKepala,
						d.status,
					]),
					styles: { fontSize: 10 },
					headStyles: { fillColor: [34, 139, 94] },
				});
			} else {
				autoTable(doc, {
					startY: 40,
					head: [
						[
							"No",
							"Nama Ibu Hamil",
							"Usia Kehamilan",
							"Berat",
							"Tinggi",
							"Tensi",
							"Keterangan",
						],
					],
					body: laporanIbuHamilData.map((d, i) => [
						i + 1,
						d.nama,
						`${d.usiaKehamilan} minggu`,
						d.berat,
						d.tinggi,
						d.tensi,
						d.keterangan,
					]),
					styles: { fontSize: 10 },
					headStyles: { fillColor: [34, 139, 94] },
				});
			}

			const pageHeight = doc.internal.pageSize.getHeight();
			doc.setFontSize(9);
			doc.setTextColor(120);
			doc.text(
				"Dicetak dari Sistem Informasi Posyandu",
				14,
				pageHeight - 12,
			);
			doc.text(
				`Tanggal cetak: ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
				14,
				pageHeight - 7,
			);
			doc.save(
				`laporan-${activeTab}-${bulan.toLowerCase()}-${tahun}.pdf`,
			);
			toast({
				title: "Berhasil",
				description: "File PDF berhasil diunduh.",
			});
		} finally {
			setExportingPdf(false);
		}
	};

	// --- Export Excel ---
	const handleExportExcel = () => {
		setExportingExcel(true);
		try {
			const now = new Date();
			const title =
				activeTab === "balita"
					? "Laporan Pemeriksaan Balita"
					: "Laporan Pemeriksaan Ibu Hamil";
			let wsData: (string | number)[][];

			if (activeTab === "balita") {
				wsData = [
					[title],
					[`Bulan: ${bulan} ${tahun}`],
					[
						`Tanggal Cetak: ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
					],
					[],
					[
						"No",
						"Nama Balita",
						"Umur",
						"Berat",
						"Tinggi",
						"Lingkar Kepala",
						"Status Gizi",
					],
					...laporanBalitaData.map((d, i) => [
						i + 1,
						d.nama,
						d.umur,
						d.berat,
						d.tinggi,
						d.lingkarKepala,
						d.status,
					]),
				];
			} else {
				wsData = [
					[title],
					[`Bulan: ${bulan} ${tahun}`],
					[
						`Tanggal Cetak: ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
					],
					[],
					[
						"No",
						"Nama Ibu Hamil",
						"Usia Kehamilan",
						"Berat",
						"Tinggi",
						"Tensi",
						"Keterangan",
					],
					...laporanIbuHamilData.map((d, i) => [
						i + 1,
						d.nama,
						`${d.usiaKehamilan} minggu`,
						d.berat,
						d.tinggi,
						d.tensi,
						d.keterangan,
					]),
				];
			}

			const ws = XLSX.utils.aoa_to_sheet(wsData);
			ws["!cols"] = [
				{ wch: 5 },
				{ wch: 22 },
				{ wch: 15 },
				{ wch: 10 },
				{ wch: 10 },
				{ wch: 15 },
				{ wch: 18 },
			];
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, title);
			XLSX.writeFile(
				wb,
				`laporan-${activeTab}-${bulan.toLowerCase()}-${tahun}.xlsx`,
			);
			toast({
				title: "Berhasil",
				description: "File Excel berhasil diunduh.",
			});
		} finally {
			setExportingExcel(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-foreground">Laporan</h2>
				<p className="text-muted-foreground">
					Rekap data pemeriksaan per bulan
				</p>
			</div>

			{/* Tab Selector */}
			<div className="flex gap-1 rounded-lg bg-muted/50 p-1 w-fit">
				<button
					onClick={() => {
						setActiveTab("balita");
						setPage(1);
					}}
					className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
						activeTab === "balita"
							? "bg-card text-foreground shadow-sm"
							: "text-muted-foreground hover:text-foreground"
					}`}>
					Balita
				</button>
				<button
					onClick={() => {
						setActiveTab("ibu-hamil");
						setPage(1);
					}}
					className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
						activeTab === "ibu-hamil"
							? "bg-card text-foreground shadow-sm"
							: "text-muted-foreground hover:text-foreground"
					}`}>
					Ibu Hamil
				</button>
			</div>

			{/* Filters & Export */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<div className="flex items-center gap-3">
					<select
						value={bulan}
						onChange={(e) => {
							setBulan(e.target.value);
							setPage(1);
						}}
						className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
						{bulanOptions.map((b) => (
							<option key={b}>{b}</option>
						))}
					</select>
					<select
						value={tahun}
						onChange={(e) => {
							setTahun(e.target.value);
							setPage(1);
						}}
						className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
						<option>2024</option>
						<option>2025</option>
						<option>2026</option>
					</select>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={handleExportPdf}
						disabled={exportingPdf}
						className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
						{exportingPdf ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<FileDown className="h-4 w-4" />
						)}
						{exportingPdf ? "Generating..." : "Export PDF"}
					</button>
					<button
						onClick={handleExportExcel}
						disabled={exportingExcel}
						className="inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-2.5 text-sm font-medium text-success hover:bg-success/10 transition-colors disabled:opacity-50">
						{exportingExcel ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<FileSpreadsheet className="h-4 w-4" />
						)}
						{exportingExcel ? "Generating..." : "Export Excel"}
					</button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
					<p className="text-sm text-muted-foreground">
						Total Diperiksa
					</p>
					<p className="text-2xl font-bold text-foreground mt-1">
						{stats.total}
					</p>
				</div>
				<div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
					<p className="text-sm text-muted-foreground">
						{stats.labelBaik}
					</p>
					<p className="text-2xl font-bold text-success mt-1">
						{stats.baik}
					</p>
				</div>
				<div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
					<p className="text-sm text-muted-foreground">
						{stats.labelPerhatian}
					</p>
					<p className="text-2xl font-bold text-warning mt-1">
						{stats.perhatian}
					</p>
				</div>
			</div>

			{/* Table */}
			<div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									No
								</th>
								{activeTab === "balita" ? (
									<>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Nama Balita
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Umur
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Berat
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Tinggi
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Lingkar Kepala
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Status Gizi
										</th>
									</>
								) : (
									<>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Nama Ibu Hamil
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Usia Kehamilan
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Berat
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Tinggi
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Tensi
										</th>
										<th className="px-4 py-3 text-left font-semibold text-foreground">
											Keterangan
										</th>
									</>
								)}
							</tr>
						</thead>
						<tbody>
							{(
								paginatedData as
									| typeof laporanBalitaData
									| typeof laporanIbuHamilData
							).map((d, i) => (
								<tr
									key={i}
									className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
									<td className="px-4 py-3 text-muted-foreground">
										{(page - 1) * limit + i + 1}
									</td>
									{activeTab === "balita"
										? (() => {
												const b =
													d as (typeof laporanBalitaData)[0];
												return (
													<>
														<td className="px-4 py-3 font-medium text-foreground">
															{b.nama}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{b.umur}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{b.berat}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{b.tinggi}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{b.lingkarKepala}
														</td>
														<td className="px-4 py-3">
															<span
																className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "Normal" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
																{b.status}
															</span>
														</td>
													</>
												);
											})()
										: (() => {
												const ih =
													d as (typeof laporanIbuHamilData)[0];
												return (
													<>
														<td className="px-4 py-3 font-medium text-foreground">
															{ih.nama}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{ih.usiaKehamilan}{" "}
															minggu
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{ih.berat}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{ih.tinggi}
														</td>
														<td className="px-4 py-3 text-muted-foreground">
															{ih.tensi}
														</td>
														<td className="px-4 py-3">
															<span
																className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
																	ih.keterangan
																		.toLowerCase()
																		.includes(
																			"tinggi",
																		)
																		? "bg-warning/10 text-warning"
																		: "bg-success/10 text-success"
																}`}>
																{ih.keterangan}
															</span>
														</td>
													</>
												);
											})()}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="px-4 py-3 border-t border-border">
					<DataPagination
						page={page}
						totalPages={totalPages}
						total={total}
						limit={limit}
						onPageChange={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

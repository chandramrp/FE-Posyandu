import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import FormModal from "@/components/FormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import DataPagination from "@/components/DataPagination";
import { usePagination } from "@/hooks/use-pagination";

const initialData = [
	{
		id: 1,
		nama: "Sari Dewi",
		namaSuami: "Ahmad Fauzi",
		umur: 28,
		usiaKehamilan: "7 bulan",
		tanggalLahir: "1998-05-10",
		alamat: "RT 02/RW 05",
	},
	{
		id: 2,
		nama: "Rina Wulandari",
		namaSuami: "Budi Prasetyo",
		umur: 25,
		usiaKehamilan: "5 bulan",
		tanggalLahir: "2001-03-22",
		alamat: "RT 01/RW 05",
	},
	{
		id: 3,
		nama: "Nur Hidayah",
		namaSuami: "Dedi Kurniawan",
		umur: 32,
		usiaKehamilan: "3 bulan",
		tanggalLahir: "1994-08-15",
		alamat: "RT 03/RW 05",
	},
	{
		id: 4,
		nama: "Lina Marlina",
		namaSuami: "Eko Susanto",
		umur: 27,
		usiaKehamilan: "8 bulan",
		tanggalLahir: "1999-01-30",
		alamat: "RT 04/RW 05",
	},
	{
		id: 5,
		nama: "Fitri Handayani",
		namaSuami: "Gunawan",
		umur: 30,
		usiaKehamilan: "6 bulan",
		tanggalLahir: "1996-11-12",
		alamat: "RT 02/RW 05",
	},
	{
		id: 6,
		nama: "Yuli Astuti",
		namaSuami: "Hendra",
		umur: 24,
		usiaKehamilan: "4 bulan",
		tanggalLahir: "2002-07-05",
		alamat: "RT 01/RW 05",
	},
];

type IbuHamil = (typeof initialData)[0];

export default function DataIbuHamil() {
	const [data, setData] = useState(initialData);
	const [search, setSearch] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [editItem, setEditItem] = useState<IbuHamil | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [form, setForm] = useState({
		nama: "",
		namaSuami: "",
		tanggalLahir: "",
		alamat: "",
	});

	const filtered = data.filter(
		(i) =>
			i.nama.toLowerCase().includes(search.toLowerCase()) ||
			i.namaSuami.toLowerCase().includes(search.toLowerCase()),
	);

	const { page, setPage, limit, total, totalPages, paginatedData } =
		usePagination(filtered);

	const openAdd = () => {
		setEditItem(null);
		setForm({ nama: "", namaSuami: "", tanggalLahir: "", alamat: "" });
		setModalOpen(true);
	};
	const openEdit = (item: IbuHamil) => {
		setEditItem(item);
		setForm({
			nama: item.nama,
			namaSuami: item.namaSuami,
			tanggalLahir: item.tanggalLahir,
			alamat: item.alamat,
		});
		setModalOpen(true);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editItem) {
			setData(
				data.map((d) => (d.id === editItem.id ? { ...d, ...form } : d)),
			);
			toast({
				title: "Berhasil",
				description: "Data ibu hamil berhasil diperbarui.",
			});
		} else {
			setData([
				...data,
				{ id: Date.now(), ...form, umur: 0, usiaKehamilan: "-" },
			]);
			toast({
				title: "Berhasil",
				description: "Data ibu hamil berhasil ditambahkan.",
			});
		}
		setModalOpen(false);
	};

	const handleDelete = () => {
		if (deleteId) {
			setData(data.filter((d) => d.id !== deleteId));
			toast({
				title: "Berhasil",
				description: "Data ibu hamil berhasil dihapus.",
			});
		}
		setDeleteId(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<div>
					<h2 className="text-2xl font-bold text-foreground">
						Data Ibu Hamil
					</h2>
					<p className="text-muted-foreground">
						Kelola data ibu hamil di wilayah RW
					</p>
				</div>
				<button
					onClick={openAdd}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
					<Plus className="h-4 w-4" />
					Tambah Ibu Hamil
				</button>
			</div>

			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Cari nama ibu atau suami..."
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
									Nama Suami
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Umur
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Usia Kehamilan
								</th>
								<th className="px-4 py-3 text-center font-semibold text-foreground">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedData.map((ibu) => (
								<tr
									key={ibu.id}
									className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
									<td className="px-4 py-3 font-medium text-foreground">
										{ibu.nama}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{ibu.namaSuami}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{ibu.umur} tahun
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{ibu.usiaKehamilan}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center justify-center gap-1">
											<Link
												to={`/data-ibu-hamil/${ibu.id}`}
												className="rounded-lg p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
												<Eye className="h-4 w-4" />
											</Link>
											<button
												onClick={() => openEdit(ibu)}
												className="rounded-lg p-1.5 text-muted-foreground hover:bg-info/10 hover:text-info transition-colors">
												<Pencil className="h-4 w-4" />
											</button>
											<button
												onClick={() =>
													setDeleteId(ibu.id)
												}
												className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
									</td>
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

			<FormModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				title={
					editItem ? "Edit Data Ibu Hamil" : "Tambah Data Ibu Hamil"
				}
				onSubmit={handleSubmit}
				submitLabel={editItem ? "Simpan Perubahan" : "Simpan"}>
				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Nama Ibu *
						</label>
						<input
							required
							value={form.nama}
							onChange={(e) =>
								setForm({ ...form, nama: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Nama Suami *
						</label>
						<input
							required
							value={form.namaSuami}
							onChange={(e) =>
								setForm({ ...form, namaSuami: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Tanggal Lahir *
						</label>
						<input
							required
							type="date"
							value={form.tanggalLahir}
							onChange={(e) =>
								setForm({
									...form,
									tanggalLahir: e.target.value,
								})
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Alamat
						</label>
						<input
							value={form.alamat}
							onChange={(e) =>
								setForm({ ...form, alamat: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
				</div>
			</FormModal>

			<ConfirmDialog
				open={deleteId !== null}
				onClose={() => setDeleteId(null)}
				onConfirm={handleDelete}
				title="Hapus Data Ibu Hamil"
				description="Apakah Anda yakin ingin menghapus data ibu hamil ini?"
			/>
		</div>
	);
}

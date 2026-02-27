import {
	Search,
	Plus,
	Pencil,
	Trash2,
	Shield,
	ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import FormModal from "@/components/FormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import DataPagination from "@/components/DataPagination";
import { usePagination } from "@/hooks/use-pagination";

const initialUsers = [
	{
		id: 1,
		nama: "Fatimah",
		email: "fatimah@posyandu.id",
		role: "Admin",
		status: "Aktif",
		password: "",
	},
	{
		id: 2,
		nama: "Siti Rahayu",
		email: "siti@posyandu.id",
		role: "Kader",
		status: "Aktif",
		password: "",
	},
	{
		id: 3,
		nama: "Aminah",
		email: "aminah@posyandu.id",
		role: "Kader",
		status: "Aktif",
		password: "",
	},
	{
		id: 4,
		nama: "Rina Wati",
		email: "rina@posyandu.id",
		role: "Kader",
		status: "Nonaktif",
		password: "",
	},
	{
		id: 5,
		nama: "Kartini",
		email: "kartini@posyandu.id",
		role: "Bidan",
		status: "Aktif",
		password: "",
	},
];

type User = (typeof initialUsers)[0];

export default function ManajemenUser() {
	const { user: currentUser } = useAuth();
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [editItem, setEditItem] = useState<User | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [form, setForm] = useState({
		nama: "",
		email: "",
		password: "",
		role: "Kader",
		status: "Aktif",
	});

	const filtered = users.filter(
		(u) =>
			u.nama.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase()),
	);

	const { page, setPage, limit, total, totalPages, paginatedData } =
		usePagination(filtered);

	const openAdd = () => {
		setEditItem(null);
		setForm({
			nama: "",
			email: "",
			password: "",
			role: "Kader",
			status: "Aktif",
		});
		setModalOpen(true);
	};
	const openEdit = (u: User) => {
		setEditItem(u);
		setForm({
			nama: u.nama,
			email: u.email,
			password: "",
			role: u.role,
			status: u.status,
		});
		setModalOpen(true);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Check email uniqueness
		const duplicate = users.find(
			(u) => u.email === form.email && u.id !== editItem?.id,
		);
		if (duplicate) {
			toast({
				title: "Gagal",
				description: "Email sudah digunakan.",
				variant: "destructive",
			});
			return;
		}

		if (editItem) {
			setUsers(
				users.map((u) =>
					u.id === editItem.id
						? {
								...u,
								nama: form.nama,
								email: form.email,
								role: form.role,
								status: form.status,
								...(form.password
									? { password: form.password }
									: {}),
							}
						: u,
				),
			);
			toast({
				title: "Berhasil",
				description: "Data user berhasil diperbarui.",
			});
		} else {
			if (!form.password) {
				toast({
					title: "Gagal",
					description: "Password wajib diisi untuk user baru.",
					variant: "destructive",
				});
				return;
			}
			setUsers([...users, { id: Date.now(), ...form }]);
			toast({
				title: "Berhasil",
				description: "User berhasil ditambahkan.",
			});
		}
		setModalOpen(false);
	};

	const handleDelete = () => {
		if (deleteId) {
			setUsers(users.filter((u) => u.id !== deleteId));
			toast({ title: "Berhasil", description: "User berhasil dihapus." });
		}
		setDeleteId(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<div>
					<h2 className="text-2xl font-bold text-foreground">
						Manajemen User
					</h2>
					<p className="text-muted-foreground">
						Kelola akun pengguna sistem
					</p>
				</div>
				<button
					onClick={openAdd}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
					<Plus className="h-4 w-4" />
					Tambah User
				</button>
			</div>

			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Cari nama atau email..."
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
									Nama
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Email
								</th>
								<th className="px-4 py-3 text-left font-semibold text-foreground">
									Role
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
							{paginatedData.map((u) => (
								<tr
									key={u.id}
									className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
									<td className="px-4 py-3 font-medium text-foreground">
										{u.nama}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{u.email}
									</td>
									<td className="px-4 py-3">
										<span className="inline-flex items-center gap-1 text-xs font-medium">
											{u.role === "Admin" ? (
												<ShieldCheck className="h-3.5 w-3.5 text-primary" />
											) : (
												<Shield className="h-3.5 w-3.5 text-muted-foreground" />
											)}
											{u.role}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.status === "Aktif" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
											{u.status}
										</span>
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center justify-center gap-1">
											<button
												onClick={() => openEdit(u)}
												className="rounded-lg p-1.5 text-muted-foreground hover:bg-info/10 hover:text-info transition-colors">
												<Pencil className="h-4 w-4" />
											</button>
											{u.id !== currentUser?.id ? (
												<button
													onClick={() =>
														setDeleteId(u.id)
													}
													className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
													<Trash2 className="h-4 w-4" />
												</button>
											) : (
												<span
													className="rounded-lg p-1.5 text-muted-foreground/30 cursor-not-allowed"
													title="Tidak dapat menghapus akun sendiri">
													<Trash2 className="h-4 w-4" />
												</span>
											)}
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
				title={editItem ? "Edit User" : "Tambah User"}
				onSubmit={handleSubmit}
				submitLabel={editItem ? "Simpan Perubahan" : "Simpan"}>
				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Nama *
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
							Email *
						</label>
						<input
							required
							type="email"
							value={form.email}
							onChange={(e) =>
								setForm({ ...form, email: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							{editItem
								? "Password (kosongkan jika tidak diganti)"
								: "Password *"}
						</label>
						<input
							type="password"
							required={!editItem}
							value={form.password}
							onChange={(e) =>
								setForm({ ...form, password: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Role *
						</label>
						<select
							required
							value={form.role}
							onChange={(e) =>
								setForm({ ...form, role: e.target.value })
							}
							className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
							<option>Admin</option>
							<option>Kader</option>
							<option>Bidan</option>
						</select>
					</div>
					{editItem && (
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Status *
							</label>
							<select
								required
								value={form.status}
								onChange={(e) =>
									setForm({ ...form, status: e.target.value })
								}
								className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
								<option>Aktif</option>
								<option>Nonaktif</option>
							</select>
						</div>
					)}
				</div>
			</FormModal>

			<ConfirmDialog
				open={deleteId !== null}
				onClose={() => setDeleteId(null)}
				onConfirm={handleDelete}
				title="Hapus User"
				description="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
			/>
		</div>
	);
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Pencil, Trash2, Filter } from "lucide-react";
import FormModal from "@/components/FormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "@/hooks/use-toast";

const initialData = [
  { id: 1, nama: "Aisyah Putri", tanggalLahir: "2024-03-15", jenisKelamin: "Perempuan", namaOrtu: "Fatimah", alamat: "RT 03/RW 05" },
  { id: 2, nama: "Rizki Ahmad", tanggalLahir: "2023-11-20", jenisKelamin: "Laki-laki", namaOrtu: "Siti Rahayu", alamat: "RT 01/RW 05" },
  { id: 3, nama: "Siti Nuraini", tanggalLahir: "2024-06-08", jenisKelamin: "Perempuan", namaOrtu: "Aminah", alamat: "RT 02/RW 05" },
  { id: 4, nama: "Budi Santoso", tanggalLahir: "2023-08-12", jenisKelamin: "Laki-laki", namaOrtu: "Rina Wati", alamat: "RT 04/RW 05" },
  { id: 5, nama: "Dewi Lestari", tanggalLahir: "2024-01-25", jenisKelamin: "Perempuan", namaOrtu: "Kartini", alamat: "RT 03/RW 05" },
  { id: 6, nama: "Fajar Ramadan", tanggalLahir: "2023-04-10", jenisKelamin: "Laki-laki", namaOrtu: "Nurhasanah", alamat: "RT 02/RW 05" },
  { id: 7, nama: "Zahra Amelia", tanggalLahir: "2024-09-01", jenisKelamin: "Perempuan", namaOrtu: "Dewi S.", alamat: "RT 01/RW 05" },
  { id: 8, nama: "Arif Maulana", tanggalLahir: "2023-12-18", jenisKelamin: "Laki-laki", namaOrtu: "Sri Mulyani", alamat: "RT 04/RW 05" },
];

type Balita = typeof initialData[0];

export default function DataBalita() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Balita | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ nama: "", tanggalLahir: "", jenisKelamin: "Laki-laki", namaOrtu: "", alamat: "" });

  const filtered = data.filter((b) => {
    const matchSearch = b.nama.toLowerCase().includes(search.toLowerCase()) || b.namaOrtu.toLowerCase().includes(search.toLowerCase());
    const matchGender = filterGender === "Semua" || b.jenisKelamin === filterGender;
    return matchSearch && matchGender;
  });

  const openAdd = () => { setEditItem(null); setForm({ nama: "", tanggalLahir: "", jenisKelamin: "Laki-laki", namaOrtu: "", alamat: "" }); setModalOpen(true); };
  const openEdit = (b: Balita) => { setEditItem(b); setForm({ nama: b.nama, tanggalLahir: b.tanggalLahir, jenisKelamin: b.jenisKelamin, namaOrtu: b.namaOrtu, alamat: b.alamat }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
      toast({ title: "Berhasil", description: "Data balita berhasil diperbarui." });
    } else {
      setData([...data, { id: Date.now(), ...form }]);
      toast({ title: "Berhasil", description: "Data balita berhasil ditambahkan." });
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) { setData(data.filter(d => d.id !== deleteId)); toast({ title: "Berhasil", description: "Data balita berhasil dihapus." }); }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Balita</h2>
          <p className="text-muted-foreground">Kelola data balita di wilayah RW</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />Tambah Balita
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Cari nama balita atau orang tua..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
            <option>Semua</option><option>Laki-laki</option><option>Perempuan</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Nama Balita</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tanggal Lahir</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Jenis Kelamin</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Nama Orang Tua</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{b.nama}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.tanggalLahir}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.jenisKelamin === "Laki-laki" ? "bg-info/10 text-info" : "bg-destructive/10 text-destructive"}`}>{b.jenisKelamin}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{b.namaOrtu}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link to={`/data-balita/${b.id}`} className="rounded-lg p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"><Eye className="h-4 w-4" /></Link>
                      <button onClick={() => openEdit(b)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-info/10 hover:text-info transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(b.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Data Balita" : "Tambah Data Balita"} onSubmit={handleSubmit} submitLabel={editItem ? "Simpan Perubahan" : "Simpan"}>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium text-foreground mb-1">Nama Balita *</label><input required value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Tanggal Lahir *</label><input required type="date" value={form.tanggalLahir} onChange={e => setForm({...form, tanggalLahir: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Jenis Kelamin *</label><select required value={form.jenisKelamin} onChange={e => setForm({...form, jenisKelamin: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Nama Orang Tua *</label><input required value={form.namaOrtu} onChange={e => setForm({...form, namaOrtu: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Alamat</label><input value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
        </div>
      </FormModal>

      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Hapus Data Balita" description="Apakah Anda yakin ingin menghapus data balita ini? Tindakan ini tidak dapat dibatalkan." />
    </div>
  );
}

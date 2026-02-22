import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Baby, Pencil } from "lucide-react";
import FormModal from "@/components/FormModal";
import { toast } from "@/hooks/use-toast";

const balitaInfo = {
  nama: "Aisyah Putri", tanggalLahir: "15 Maret 2024", jenisKelamin: "Perempuan",
  namaOrtu: "Fatimah", alamat: "RT 03/RW 05, Kel. Sukamaju", posyandu: "Posyandu Melati",
};

const initialRiwayat = [
  { id: 1, tanggal: "2026-02-15", berat: "9.5", tinggi: "72", lingkarKepala: "43", keterangan: "Normal" },
  { id: 2, tanggal: "2026-01-18", berat: "9.2", tinggi: "71", lingkarKepala: "42.5", keterangan: "Normal" },
  { id: 3, tanggal: "2025-12-20", berat: "8.9", tinggi: "70", lingkarKepala: "42", keterangan: "Normal" },
  { id: 4, tanggal: "2025-11-15", berat: "8.5", tinggi: "69", lingkarKepala: "41.5", keterangan: "Berat kurang" },
  { id: 5, tanggal: "2025-10-18", berat: "8.2", tinggi: "68", lingkarKepala: "41", keterangan: "Normal" },
];

type Pemeriksaan = typeof initialRiwayat[0];

export default function DetailBalita() {
  const { id } = useParams();
  const [riwayat, setRiwayat] = useState(initialRiwayat);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Pemeriksaan | null>(null);
  const [form, setForm] = useState({ tanggal: "", berat: "", tinggi: "", lingkarKepala: "", keterangan: "" });

  const openAdd = () => { setEditItem(null); setForm({ tanggal: "", berat: "", tinggi: "", lingkarKepala: "", keterangan: "" }); setModalOpen(true); };
  const openEdit = (item: Pemeriksaan) => { setEditItem(item); setForm({ tanggal: item.tanggal, berat: item.berat, tinggi: item.tinggi, lingkarKepala: item.lingkarKepala, keterangan: item.keterangan }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setRiwayat(riwayat.map(r => r.id === editItem.id ? { ...r, ...form } : r));
      toast({ title: "Berhasil", description: "Data pemeriksaan berhasil diperbarui." });
    } else {
      setRiwayat([{ id: Date.now(), ...form }, ...riwayat]);
      toast({ title: "Berhasil", description: "Data pemeriksaan berhasil ditambahkan." });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/data-balita" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div><h2 className="text-2xl font-bold text-foreground">Detail Balita</h2><p className="text-muted-foreground">Informasi lengkap dan riwayat pemeriksaan</p></div>
      </div>

      <div className="rounded-xl bg-card p-6 card-shadow border border-border">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"><Baby className="h-7 w-7" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            <div><p className="text-xs text-muted-foreground">Nama Balita</p><p className="text-sm font-semibold text-foreground">{balitaInfo.nama}</p></div>
            <div><p className="text-xs text-muted-foreground">Tanggal Lahir</p><p className="text-sm font-semibold text-foreground">{balitaInfo.tanggalLahir}</p></div>
            <div><p className="text-xs text-muted-foreground">Jenis Kelamin</p><p className="text-sm font-semibold text-foreground">{balitaInfo.jenisKelamin}</p></div>
            <div><p className="text-xs text-muted-foreground">Nama Orang Tua</p><p className="text-sm font-semibold text-foreground">{balitaInfo.namaOrtu}</p></div>
            <div><p className="text-xs text-muted-foreground">Alamat</p><p className="text-sm font-semibold text-foreground">{balitaInfo.alamat}</p></div>
            <div><p className="text-xs text-muted-foreground">Posyandu</p><p className="text-sm font-semibold text-foreground">{balitaInfo.posyandu}</p></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Riwayat Pemeriksaan</h3>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />Tambah Pemeriksaan</button>
      </div>

      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tanggal</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Berat Badan</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tinggi Badan</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Lingkar Kepala</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Keterangan</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{r.tanggal}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.berat} kg</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.tinggi} cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.lingkarKepala} cm</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${r.keterangan === "Normal" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{r.keterangan}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEdit(r)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-info/10 hover:text-info transition-colors"><Pencil className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Pemeriksaan" : "Tambah Pemeriksaan"} onSubmit={handleSubmit} submitLabel={editItem ? "Simpan Perubahan" : "Simpan"}>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium text-foreground mb-1">Tanggal *</label><input required type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Berat Badan (kg) *</label><input required type="number" step="0.1" min="0" value={form.berat} onChange={e => setForm({...form, berat: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Tinggi Badan (cm) *</label><input required type="number" step="0.1" min="0" value={form.tinggi} onChange={e => setForm({...form, tinggi: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Lingkar Kepala (cm) *</label><input required type="number" step="0.1" min="0" value={form.lingkarKepala} onChange={e => setForm({...form, lingkarKepala: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Keterangan</label><input value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
        </div>
      </FormModal>
    </div>
  );
}

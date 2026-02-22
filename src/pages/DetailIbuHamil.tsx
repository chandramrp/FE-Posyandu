import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, HeartPulse, Pencil } from "lucide-react";
import FormModal from "@/components/FormModal";
import { toast } from "@/hooks/use-toast";

const ibuInfo = {
  nama: "Sari Dewi", namaSuami: "Ahmad Fauzi", umur: 28,
  alamat: "RT 02/RW 05, Kel. Sukamaju", golDarah: "O", posyandu: "Posyandu Melati",
};

const initialRiwayat = [
  { id: 1, tanggal: "2026-02-15", usiaKehamilan: "28 minggu", berat: "65", tinggi: "160", tensi: "120/80", keterangan: "Normal" },
  { id: 2, tanggal: "2026-01-18", usiaKehamilan: "24 minggu", berat: "63", tinggi: "160", tensi: "118/78", keterangan: "Normal" },
  { id: 3, tanggal: "2025-12-20", usiaKehamilan: "20 minggu", berat: "61", tinggi: "160", tensi: "125/85", keterangan: "Tensi tinggi" },
  { id: 4, tanggal: "2025-11-15", usiaKehamilan: "16 minggu", berat: "59", tinggi: "160", tensi: "120/80", keterangan: "Normal" },
];

type Pemeriksaan = typeof initialRiwayat[0];

export default function DetailIbuHamil() {
  const { id } = useParams();
  const [riwayat, setRiwayat] = useState(initialRiwayat);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Pemeriksaan | null>(null);
  const [form, setForm] = useState({ tanggal: "", usiaKehamilan: "", berat: "", tinggi: "", tensi: "", keterangan: "" });

  const openAdd = () => { setEditItem(null); setForm({ tanggal: "", usiaKehamilan: "", berat: "", tinggi: "", tensi: "", keterangan: "" }); setModalOpen(true); };
  const openEdit = (item: Pemeriksaan) => { setEditItem(item); setForm({ tanggal: item.tanggal, usiaKehamilan: item.usiaKehamilan, berat: item.berat, tinggi: item.tinggi, tensi: item.tensi, keterangan: item.keterangan }); setModalOpen(true); };

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
        <Link to="/data-ibu-hamil" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div><h2 className="text-2xl font-bold text-foreground">Detail Ibu Hamil</h2><p className="text-muted-foreground">Informasi lengkap dan riwayat pemeriksaan</p></div>
      </div>

      <div className="rounded-xl bg-card p-6 card-shadow border border-border">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-info/10 text-info"><HeartPulse className="h-7 w-7" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            <div><p className="text-xs text-muted-foreground">Nama Ibu</p><p className="text-sm font-semibold text-foreground">{ibuInfo.nama}</p></div>
            <div><p className="text-xs text-muted-foreground">Nama Suami</p><p className="text-sm font-semibold text-foreground">{ibuInfo.namaSuami}</p></div>
            <div><p className="text-xs text-muted-foreground">Umur</p><p className="text-sm font-semibold text-foreground">{ibuInfo.umur} tahun</p></div>
            <div><p className="text-xs text-muted-foreground">Alamat</p><p className="text-sm font-semibold text-foreground">{ibuInfo.alamat}</p></div>
            <div><p className="text-xs text-muted-foreground">Gol. Darah</p><p className="text-sm font-semibold text-foreground">{ibuInfo.golDarah}</p></div>
            <div><p className="text-xs text-muted-foreground">Posyandu</p><p className="text-sm font-semibold text-foreground">{ibuInfo.posyandu}</p></div>
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
                <th className="px-4 py-3 text-left font-semibold text-foreground">Usia Kehamilan</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Berat Badan</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tinggi Badan</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tensi</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Keterangan</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{r.tanggal}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.usiaKehamilan}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.berat} kg</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.tinggi} cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.tensi}</td>
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
          <div><label className="block text-sm font-medium text-foreground mb-1">Usia Kehamilan *</label><input required value={form.usiaKehamilan} onChange={e => setForm({...form, usiaKehamilan: e.target.value})} placeholder="cth: 28 minggu" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Berat Badan (kg) *</label><input required type="number" step="0.1" min="0" value={form.berat} onChange={e => setForm({...form, berat: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Tinggi Badan (cm) *</label><input required type="number" step="0.1" min="0" value={form.tinggi} onChange={e => setForm({...form, tinggi: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Tensi *</label><input required value={form.tensi} onChange={e => setForm({...form, tensi: e.target.value})} placeholder="cth: 120/80" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Keterangan</label><input value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
        </div>
      </FormModal>
    </div>
  );
}

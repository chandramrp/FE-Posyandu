import { useState } from "react";
import { FileDown, FileSpreadsheet, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";

const laporanData = [
  { nama: "Aisyah Putri", umur: "23 bln", berat: "9.5 kg", tinggi: "72 cm", status: "Normal" },
  { nama: "Rizki Ahmad", umur: "27 bln", berat: "10.2 kg", tinggi: "76 cm", status: "Normal" },
  { nama: "Siti Nuraini", umur: "20 bln", berat: "8.1 kg", tinggi: "67 cm", status: "Gizi Kurang" },
  { nama: "Budi Santoso", umur: "30 bln", berat: "11.0 kg", tinggi: "78 cm", status: "Normal" },
  { nama: "Dewi Lestari", umur: "25 bln", berat: "7.8 kg", tinggi: "65 cm", status: "Gizi Kurang" },
  { nama: "Fajar Ramadan", umur: "34 bln", berat: "12.5 kg", tinggi: "85 cm", status: "Normal" },
];

const bulanOptions = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

export default function Laporan() {
  const [bulan, setBulan] = useState("Februari");
  const [tahun, setTahun] = useState("2026");
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  const handleExportPdf = () => {
    setExportingPdf(true);
    try {
      const doc = new jsPDF({ orientation: "landscape" });
      const now = new Date();
      doc.setFontSize(18);
      doc.text("Laporan Posyandu RW", 148, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Bulan: ${bulan} ${tahun}`, 148, 30, { align: "center" });
      autoTable(doc, {
        startY: 40,
        head: [["No", "Nama Balita", "Umur", "Berat", "Tinggi", "Status Gizi"]],
        body: laporanData.map((d, i) => [i + 1, d.nama, d.umur, d.berat, d.tinggi, d.status]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [34, 139, 94] },
      });
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("Dicetak dari Sistem Informasi Posyandu", 14, pageHeight - 12);
      doc.text(`Tanggal cetak: ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, 14, pageHeight - 7);
      doc.save(`laporan-posyandu-${bulan.toLowerCase()}-${tahun}.pdf`);
      toast({ title: "Berhasil", description: "File PDF berhasil diunduh." });
    } finally {
      setExportingPdf(false);
    }
  };

  const handleExportExcel = () => {
    setExportingExcel(true);
    try {
      const now = new Date();
      const wsData = [
        ["Laporan Posyandu RW"],
        [`Bulan: ${bulan} ${tahun}`],
        [`Tanggal Cetak: ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`],
        [],
        ["No", "Nama Balita", "Umur", "Berat", "Tinggi", "Status Gizi"],
        ...laporanData.map((d, i) => [i + 1, d.nama, d.umur, d.berat, d.tinggi, d.status]),
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      // Auto column widths
      ws["!cols"] = [{ wch: 5 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 15 }];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Laporan Posyandu");
      XLSX.writeFile(wb, `laporan-posyandu-${bulan.toLowerCase()}-${tahun}.xlsx`);
      toast({ title: "Berhasil", description: "File Excel berhasil diunduh." });
    } finally {
      setExportingExcel(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Laporan</h2>
        <p className="text-muted-foreground">Rekap data pemeriksaan balita per bulan</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <select value={bulan} onChange={(e) => setBulan(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
            {bulanOptions.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select value={tahun} onChange={(e) => setTahun(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
            <option>2024</option><option>2025</option><option>2026</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportPdf} disabled={exportingPdf}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
            {exportingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
            {exportingPdf ? "Generating..." : "Export PDF"}
          </button>
          <button onClick={handleExportExcel} disabled={exportingExcel}
            className="inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-2.5 text-sm font-medium text-success hover:bg-success/10 transition-colors disabled:opacity-50">
            {exportingExcel ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
            {exportingExcel ? "Generating..." : "Export Excel"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
          <p className="text-sm text-muted-foreground">Total Diperiksa</p>
          <p className="text-2xl font-bold text-foreground mt-1">6</p>
        </div>
        <div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
          <p className="text-sm text-muted-foreground">Gizi Normal</p>
          <p className="text-2xl font-bold text-success mt-1">4</p>
        </div>
        <div className="rounded-xl bg-card p-4 card-shadow border border-border text-center">
          <p className="text-sm text-muted-foreground">Gizi Kurang</p>
          <p className="text-2xl font-bold text-warning mt-1">2</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">No</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Nama Balita</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Umur</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Berat</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tinggi</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Status Gizi</th>
              </tr>
            </thead>
            <tbody>
              {laporanData.map((d, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{d.nama}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.umur}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.berat}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.tinggi}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${d.status === "Normal" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HeartPulse, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama: "", email: "", password: "", confirmPassword: "", role: "Kader" as UserRole });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.nama || !form.email || !form.password || !form.confirmPassword) {
      setError("Semua field wajib diisi."); return;
    }
    if (form.password.length < 6) { setError("Password minimal 6 karakter."); return; }
    if (form.password !== form.confirmPassword) { setError("Konfirmasi password tidak cocok."); return; }

    setLoading(true);
    setTimeout(() => {
      const result = register({ nama: form.nama, email: form.email, password: form.password, role: form.role });
      if (!result.success) {
        setError(result.message);
        toast({ title: "Registrasi Gagal", description: result.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: result.message });
        navigate("/login");
      }
      setLoading(false);
    }, 500);
  };

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <HeartPulse className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Daftar Akun Baru</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sistem Informasi Posyandu RW</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Nama</label>
              <input required value={form.nama} onChange={(e) => update("nama", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="Nama lengkap" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="email@posyandu.id" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Minimal 6 karakter" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Konfirmasi Password</label>
              <input required type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="Ulangi password" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Role</label>
              <select required value={form.role} onChange={(e) => update("role", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                <option>Admin</option>
                <option>Kader</option>
                <option>Bidan</option>
              </select>
            </div>

            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

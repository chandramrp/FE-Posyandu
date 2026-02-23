import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "Admin" | "Kader" | "Bidan";

export interface AuthUser {
  id: number;
  nama: string;
  email: string;
  role: UserRole;
  status: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => { success: boolean; message: string };
  register: (data: { nama: string; email: string; password: string; role: UserRole }) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "posyandu_users";
const SESSION_KEY = "posyandu_session";

function getStoredUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);
  // Seed default users
  const defaults = [
    { id: 1, nama: "Fatimah", email: "fatimah@posyandu.id", password: "admin123", role: "Admin", status: "Aktif" },
    { id: 2, nama: "Siti Rahayu", email: "siti@posyandu.id", password: "kader123", role: "Kader", status: "Aktif" },
    { id: 3, nama: "Aminah", email: "aminah@posyandu.id", password: "kader123", role: "Kader", status: "Aktif" },
    { id: 4, nama: "Rina Wati", email: "rina@posyandu.id", password: "kader123", role: "Kader", status: "Nonaktif" },
    { id: 5, nama: "Kartini", email: "kartini@posyandu.id", password: "bidan123", role: "Bidan", status: "Aktif" },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
  return defaults;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      // Verify user still exists and is active
      const users = getStoredUsers();
      const found = users.find((u: any) => u.id === parsed.id && u.status === "Aktif");
      if (found) {
        setUser({ id: found.id, nama: found.nama, email: found.email, role: found.role, status: found.status });
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, remember: boolean) => {
    const users = getStoredUsers();
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return { success: false, message: "Email atau password salah." };
    if (found.status === "Nonaktif") return { success: false, message: "Akun Anda tidak aktif. Hubungi admin." };

    const userData: AuthUser = { id: found.id, nama: found.nama, email: found.email, role: found.role, status: found.status };
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(userData));
    if (!remember) localStorage.removeItem(SESSION_KEY);
    setUser(userData);
    return { success: true, message: "Login berhasil." };
  };

  const register = (data: { nama: string; email: string; password: string; role: UserRole }) => {
    const users = getStoredUsers();
    if (users.find((u: any) => u.email === data.email)) {
      return { success: false, message: "Email sudah terdaftar." };
    }
    const newUser = { id: Date.now(), ...data, status: "Aktif" };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: "Registrasi berhasil. Silakan login." };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

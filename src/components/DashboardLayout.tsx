import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LogoutConfirmDialog from "./LogoutConfirmDialog";
import {
  LayoutDashboard,
  Baby,
  Stethoscope,
  HeartPulse,
  ClipboardList,
  FileBarChart,
  Users,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

const allMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Data Balita", icon: Baby, path: "/data-balita", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Pemeriksaan Balita", icon: Stethoscope, path: "/pemeriksaan-balita", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Data Ibu Hamil", icon: HeartPulse, path: "/data-ibu-hamil", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Pemeriksaan Ibu Hamil", icon: ClipboardList, path: "/pemeriksaan-ibu-hamil", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Laporan", icon: FileBarChart, path: "/laporan", roles: ["Admin", "Kader", "Bidan"] },
  { title: "Manajemen User", icon: Users, path: "/manajemen-user", roles: ["Admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = allMenuItems.filter((item) => user && item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <HeartPulse className="h-7 w-7 text-sidebar-primary shrink-0" />
        {sidebarOpen && (
          <span className="text-lg font-bold text-sidebar-accent-foreground tracking-tight">
            Posyandu RW
          </span>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
              ${isActive(item.path)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside
        className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-[72px]"
        }`}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 flex h-full w-64 flex-col bg-sidebar">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 text-sidebar-foreground hover:text-sidebar-accent-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6 card-shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setMobileOpen(true);
                else setSidebarOpen(!sidebarOpen);
              }}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              Sistem Informasi Posyandu
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-muted transition-colors cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {user?.nama?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.nama || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.role || "—"}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>
            <button
              onClick={() => setLogoutOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <LogoutConfirmDialog
          open={logoutOpen}
          onOpenChange={setLogoutOpen}
          onConfirm={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

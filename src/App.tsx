import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DataBalita from "./pages/DataBalita";
import DetailBalita from "./pages/DetailBalita";
import DataIbuHamil from "./pages/DataIbuHamil";
import DetailIbuHamil from "./pages/DetailIbuHamil";
import PemeriksaanBalita from "./pages/PemeriksaanBalita";
import PemeriksaanIbuHamil from "./pages/PemeriksaanIbuHamil";
import Laporan from "./pages/Laporan";
import ManajemenUser from "./pages/ManajemenUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/data-balita" element={<ProtectedRoute><DashboardLayout><DataBalita /></DashboardLayout></ProtectedRoute>} />
            <Route path="/data-balita/:id" element={<ProtectedRoute><DashboardLayout><DetailBalita /></DashboardLayout></ProtectedRoute>} />
            <Route path="/pemeriksaan-balita" element={<ProtectedRoute><DashboardLayout><PemeriksaanBalita /></DashboardLayout></ProtectedRoute>} />
            <Route path="/data-ibu-hamil" element={<ProtectedRoute><DashboardLayout><DataIbuHamil /></DashboardLayout></ProtectedRoute>} />
            <Route path="/data-ibu-hamil/:id" element={<ProtectedRoute><DashboardLayout><DetailIbuHamil /></DashboardLayout></ProtectedRoute>} />
            <Route path="/pemeriksaan-ibu-hamil" element={<ProtectedRoute><DashboardLayout><PemeriksaanIbuHamil /></DashboardLayout></ProtectedRoute>} />
            <Route path="/laporan" element={<ProtectedRoute><DashboardLayout><Laporan /></DashboardLayout></ProtectedRoute>} />
            <Route path="/manajemen-user" element={<ProtectedRoute allowedRoles={["Admin"]}><DashboardLayout><ManajemenUser /></DashboardLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route
						element={
							<DashboardLayout>
								<></>
							</DashboardLayout>
						}></Route>
					<Route
						path="/"
						element={
							<DashboardLayout>
								<Dashboard />
							</DashboardLayout>
						}
					/>
					<Route
						path="/data-balita"
						element={
							<DashboardLayout>
								<DataBalita />
							</DashboardLayout>
						}
					/>
					<Route
						path="/data-balita/:id"
						element={
							<DashboardLayout>
								<DetailBalita />
							</DashboardLayout>
						}
					/>
					<Route
						path="/pemeriksaan-balita"
						element={
							<DashboardLayout>
								<PemeriksaanBalita />
							</DashboardLayout>
						}
					/>
					<Route
						path="/data-ibu-hamil"
						element={
							<DashboardLayout>
								<DataIbuHamil />
							</DashboardLayout>
						}
					/>
					<Route
						path="/data-ibu-hamil/:id"
						element={
							<DashboardLayout>
								<DetailIbuHamil />
							</DashboardLayout>
						}
					/>
					<Route
						path="/pemeriksaan-ibu-hamil"
						element={
							<DashboardLayout>
								<PemeriksaanIbuHamil />
							</DashboardLayout>
						}
					/>
					<Route
						path="/laporan"
						element={
							<DashboardLayout>
								<Laporan />
							</DashboardLayout>
						}
					/>
					<Route
						path="/manajemen-user"
						element={
							<DashboardLayout>
								<ManajemenUser />
							</DashboardLayout>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;

import {
	Baby,
	HeartPulse,
	Stethoscope,
	Users,
	TrendingUp,
	TrendingDown,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const stats = [
	{
		title: "Total Balita",
		value: "156",
		icon: Baby,
		change: "+12",
		trend: "up" as const,
		color: "bg-primary/10 text-primary",
	},
	{
		title: "Total Ibu Hamil",
		value: "43",
		icon: HeartPulse,
		change: "+5",
		trend: "up" as const,
		color: "bg-info/10 text-info",
	},
	{
		title: "Pemeriksaan Bulan Ini",
		value: "87",
		icon: Stethoscope,
		change: "+23",
		trend: "up" as const,
		color: "bg-success/10 text-success",
	},
	{
		title: "Kehadiran Bulan Ini",
		value: "72%",
		icon: Users,
		change: "-3%",
		trend: "down" as const,
		color: "bg-warning/10 text-warning",
	},
];

const chartData = [
	{ bulan: "Jan", beratRata: 8.2, tinggiRata: 68 },
	{ bulan: "Feb", beratRata: 8.5, tinggiRata: 69 },
	{ bulan: "Mar", beratRata: 8.8, tinggiRata: 70 },
	{ bulan: "Apr", beratRata: 9.1, tinggiRata: 71.5 },
	{ bulan: "Mei", beratRata: 9.4, tinggiRata: 72.5 },
	{ bulan: "Jun", beratRata: 9.7, tinggiRata: 73.5 },
	{ bulan: "Jul", beratRata: 10.0, tinggiRata: 75 },
	{ bulan: "Agu", beratRata: 10.2, tinggiRata: 76 },
];

const recentExams = [
	{
		nama: "Aisyah Putri",
		tanggal: "15 Feb 2026",
		berat: "9.5 kg",
		tinggi: "72 cm",
		status: "Normal",
	},
	{
		nama: "Rizki Ahmad",
		tanggal: "15 Feb 2026",
		berat: "10.2 kg",
		tinggi: "76 cm",
		status: "Normal",
	},
	{
		nama: "Siti Nuraini",
		tanggal: "14 Feb 2026",
		berat: "8.1 kg",
		tinggi: "67 cm",
		status: "Perlu Perhatian",
	},
	{
		nama: "Budi Santoso",
		tanggal: "14 Feb 2026",
		berat: "11.0 kg",
		tinggi: "78 cm",
		status: "Normal",
	},
	{
		nama: "Dewi Lestari",
		tanggal: "13 Feb 2026",
		berat: "7.8 kg",
		tinggi: "65 cm",
		status: "Perlu Perhatian",
	},
];

export default function Dashboard() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-foreground">
					Dashboard
				</h2>
				<p className="text-muted-foreground">
					Ringkasan data Posyandu RW bulan ini
				</p>
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<div
						key={stat.title}
						className="rounded-xl bg-card p-5 card-shadow hover:card-shadow-hover transition-shadow border border-border">
						<div className="flex items-start justify-between">
							<div>
								<p className="text-sm text-muted-foreground">
									{stat.title}
								</p>
								<p className="mt-1 text-3xl font-bold text-foreground">
									{stat.value}
								</p>
							</div>
							<div className={`rounded-xl p-2.5 ${stat.color}`}>
								<stat.icon className="h-5 w-5" />
							</div>
						</div>
						<div className="mt-3 flex items-center gap-1 text-sm">
							{stat.trend === "up" ? (
								<TrendingUp className="h-4 w-4 text-success" />
							) : (
								<TrendingDown className="h-4 w-4 text-destructive" />
							)}
							<span
								className={
									stat.trend === "up"
										? "text-success"
										: "text-destructive"
								}>
								{stat.change}
							</span>
							<span className="text-muted-foreground">
								dari bulan lalu
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Chart & Table */}
			<div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
				{/* Line Chart */}
				<div className="xl:col-span-3 rounded-xl bg-card p-5 card-shadow border border-border">
					<h3 className="text-base font-semibold text-foreground mb-4">
						Pertumbuhan Rata-rata Balita
					</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={chartData}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(210 18% 90%)"
							/>
							<XAxis
								dataKey="bulan"
								tick={{ fontSize: 12 }}
								stroke="hsl(210 10% 50%)"
							/>
							<YAxis
								tick={{ fontSize: 12 }}
								stroke="hsl(210 10% 50%)"
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "0.5rem",
									border: "1px solid hsl(210 18% 90%)",
									boxShadow:
										"0 4px 6px -1px rgba(0,0,0,0.05)",
								}}
							/>
							<Line
								type="monotone"
								dataKey="beratRata"
								stroke="hsl(162 63% 41%)"
								strokeWidth={2.5}
								dot={{ r: 4, fill: "hsl(162 63% 41%)" }}
								name="Berat (kg)"
							/>
							<Line
								type="monotone"
								dataKey="tinggiRata"
								stroke="hsl(199 89% 48%)"
								strokeWidth={2.5}
								dot={{ r: 4, fill: "hsl(199 89% 48%)" }}
								name="Tinggi (cm)"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Recent Exams Table */}
				<div className="xl:col-span-2 rounded-xl bg-card p-5 card-shadow border border-border">
					<h3 className="text-base font-semibold text-foreground mb-4">
						Pemeriksaan Terakhir
					</h3>
					<div className="space-y-3">
						{recentExams.map((exam, i) => (
							<div
								key={i}
								className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5">
								<div>
									<p className="text-sm font-medium text-foreground">
										{exam.nama}
									</p>
									<p className="text-xs text-muted-foreground">
										{exam.tanggal} · {exam.berat} ·{" "}
										{exam.tinggi}
									</p>
								</div>
								<span
									className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
										exam.status === "Normal"
											? "bg-success/10 text-success"
											: "bg-warning/10 text-warning"
									}`}>
									{exam.status}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

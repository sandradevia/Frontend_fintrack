// dashboard/data/transaksiData.ts

export interface Transaksi {
  tipe: "Pemasukan" | "Pengeluaran";
  jumlah: string;
  tanggal: string;
}

export const transaksiData: Transaksi[] = [
  { tipe: "Pemasukan", jumlah: "100.000", tanggal: "12-12-2024" },
  { tipe: "Pengeluaran", jumlah: "150.000", tanggal: "12-12-2024" },
  { tipe: "Pemasukan", jumlah: "150.000", tanggal: "12-12-2024" },
  { tipe: "Pemasukan", jumlah: "50.000", tanggal: "12-12-2024" },
  { tipe: "Pemasukan", jumlah: "200.000", tanggal: "12-12-2024" },
];

// dashboardAdminData.ts

export interface DashboardSummary {
  pemasukan: number;
  pengeluaran: number;
  saldo: number;
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await fetch('http://127.0.0.1:8000/api/dashboard-summary', {
    cache: 'no-store', // supaya selalu fresh data, bisa diubah sesuai kebutuhan
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }

  const data: DashboardSummary = await res.json();
  return data;
}

// utils/admin/dashboardAdminData.ts

export interface TrendChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface TrendChartData {
  labels: string[];
  datasets: TrendChartDataset[];
}

export async function fetchTrendChartData(): Promise<TrendChartData | null> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/dashboard-trendchart"); // sesuaikan endpoint API kamu
    if (!res.ok) throw new Error('Failed to fetch trend chart data');
    const data: TrendChartData = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching trend chart data:', error);
    return null;
  }
}
export interface TrendYearData {
  year: string;
  total: number;
}
export const fetchTrendChartYearly = async (): Promise<TrendYearData[]> => {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/dashboard-trendchart-yearly"
    );
    if (!res.ok) throw new Error("Failed to fetch trend chart yearly data");
    const data: TrendYearData[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching yearly trend chart data:", error);
    throw new Error("Failed to fetch yearly trend chart data");
  }
}
// utils/admin/dashboardAdminData.ts

export interface TransaksiItem {
  tipe: string;
  jumlah: number;
  tanggal: string;
}

export async function fetchRecentTransactions(): Promise<TransaksiItem[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/dashboard-transactions");
    if (!res.ok) {
      throw new Error("Failed to fetch recent transactions");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    return [];
  }
}

// src/components/Charts/TrendBarChart.tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  ChartOptions,
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);
import {
  fetchTrendBarData,
  TrendLineApiResponse,
} from "utils/superadmin/dashboardData";

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const raw = context.raw as number;
          return `Rp. ${raw.toLocaleString("id-ID")}`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return `Rp. ${value.toLocaleString("id-ID")}`;
        },
      },
    },
  },
};

export default function TrendBarChartSuperAdmin() {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendBarData()
      .then((data: TrendLineApiResponse) => {
        const numericDatasets = data.datasets.map((ds) => ({
          ...ds,
          data: ds.data.map((val) => Number(val)),
        }));

        setChartData({
          labels: data.labels,
          datasets: numericDatasets,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat data chart");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Memuat grafik...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>Tidak ada data tersedia</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Tren Pengeluaran Tahunan
      </h4>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

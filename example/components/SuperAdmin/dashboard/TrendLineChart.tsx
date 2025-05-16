import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
  fetchTrendLineData,
  TrendLineApiResponse,
} from "utils/superadmin/dashboardData";

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: {
      callbacks: {
        label: function (context) {
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

export default function TrendLineChartSuperAdmin() {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // total pemasukan tahunan
  const [totalPemasukan, setTotalPemasukan] = useState<number>(0);

  useEffect(() => {
    fetchTrendLineData()
      .then((data: TrendLineApiResponse) => {
        const numericDatasets = data.datasets.map((ds) => ({
          ...ds,
          data: ds.data.map((v) => Number(v)),
        }));
        setChartData({
          labels: data.labels,
          datasets: numericDatasets,
        });

        // Ganti pencarian label sesuai dengan yang diberikan oleh controller
        const totalKeuanganDataset = numericDatasets.find(
          (ds) => ds.label?.toLowerCase() === "total keuangan"
        );

        if (totalKeuanganDataset && totalKeuanganDataset.data) {
          const total = (totalKeuanganDataset.data as number[]).reduce(
            (acc, val) => acc + val,
            0
          );
          setTotalPemasukan(total);
        } else {
          setTotalPemasukan(0);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error loading chart data");
        setLoading(false);
      });
  }, []);
  

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No data available</div>;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      aria-label="Tren Keuangan Tahunan"
      role="img"
    >
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Tren Keuangan Tahunan
      </h4>
      <p className="text-2xl font-bold text-blue-600 mb-2">
        Rp. {totalPemasukan.toLocaleString("id-ID")},00
      </p>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

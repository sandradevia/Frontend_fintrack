import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchTrendChartData,
  TrendChartData,
} from "../../../../utils/admin/dashboardAdminData";
import {
  ChartOptions,
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

const defaultData = {
  labels: [],
  datasets: [],
};

export default function TrendBarChart() {
  const [chartData, setChartData] = useState<TrendChartData>(defaultData);

  useEffect(() => {
    async function getData() {
      const data = await fetchTrendChartData();
      if (data) setChartData(data);
    }
    getData();
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#000" } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Tren Keuangan
      </h4>
      <Bar data={chartData} options={options} />
    </div>
  );
}

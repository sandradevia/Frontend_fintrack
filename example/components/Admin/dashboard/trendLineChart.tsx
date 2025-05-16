import { Line } from "react-chartjs-2";
import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import {
  fetchTrendChartYearly,
  TrendYearData,
} from "../../../../utils/admin/dashboardAdminData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendLineChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [totalLatest, setTotalLatest] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendChartYearly();
        const labels = data.map((item) => item.year);
        const totals = data.map((item) => item.total);

        setTotalLatest(totals[totals.length - 1] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Keuangan",
              data: totals,
              borderColor: "#6C63FF",
              backgroundColor: "rgba(108,99,255,0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Tren Keuangan Tahunan
      </h4>
      <p className="text-2xl font-bold text-blue-600 mb-2">
        Rp. {totalLatest.toLocaleString("id-ID")},00
      </p>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
}

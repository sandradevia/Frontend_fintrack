// dashboard/Dashboard.tsx
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";

import TrendLineChart from "../../../example/components/Admin/dashboard/trendLineChart";
import TrendBarChart from "../../../example/components/Admin/dashboard/trendBarChart";
import TransaksiTerbaruTable from "../../../example/components/Admin/dashboard/transaksiTerbaruTable";
import SummaryCards from "../../../example/components/Admin/dashboard/summaryCards";

export default function Dashboard() {
  return (
    <Layout>
      <PageTitle>Main Dashboard</PageTitle>
      <SummaryCards />
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <TrendLineChart />
        <TrendBarChart />
      </div>
      <TransaksiTerbaruTable />
    </Layout>
  );
}

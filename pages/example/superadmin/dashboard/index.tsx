// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";
import CardSummary from "example/components/SuperAdmin/dashboard/CardSummary";
import DokumentasiCabang from "example/components/SuperAdmin/dashboard/DokumentasiCabang";
import { ITableData } from "utils/demo/tableData";
import response from "utils/demo/tableData";
import TrendLineChartSuperAdmin from "example/components/SuperAdmin/dashboard/TrendLineChart";
import TrendBarChartSuperAdmin from "example/components/SuperAdmin/dashboard/TrendBarChart";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);

  const resultsPerPage = 10;
  const totalResults = response.length;

  const onPageChange = (p: number) => setPage(p);

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <Layout>
      <PageTitle>Main Dashboard</PageTitle>

      <CardSummary />

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <TrendLineChartSuperAdmin />
        <TrendBarChartSuperAdmin />
      </div>

      <PageTitle>Dokumentasi Cabang</PageTitle>
      <DokumentasiCabang />
    </Layout>
  );
};

export default Dashboard;

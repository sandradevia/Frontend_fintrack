// src/components/DokumentasiCabang.tsx
import React, { useEffect, useState } from "react";
import {
  fetchDokumentasiCabang,
  DokumentasiCabangItem,
} from "utils/superadmin/dashboardData";

export default function DokumentasiCabang() {
  const [data, setData] = useState<DokumentasiCabangItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDokumentasiCabang()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {data.map(({ id, name }) => (
        <div
          key={id}
          className="rounded-lg bg-white dark:bg-gray-800 shadow p-4"
        >
          <div className="mb-2 text-lg font-semibold">Cabang {id}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{name}</div>
        </div>
      ))}
    </div>
  );
}

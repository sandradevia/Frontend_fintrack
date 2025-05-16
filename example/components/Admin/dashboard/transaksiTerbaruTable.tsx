// dashboard/components/TransaksiTerbaruTable.tsx
import { useEffect, useState } from "react";
import {
  fetchRecentTransactions,
  TransaksiItem,
} from "../../../../utils/admin/dashboardAdminData";

export default function TransaksiTerbaruTable() {
  const [data, setData] = useState<TransaksiItem[]>([]);

  useEffect(() => {
    fetchRecentTransactions().then(setData);
  }, []);

  return (
    <div className="bg-[#f4f7ff] rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-white bg-[#2e3a8c] px-6 py-4 rounded-t-lg">
        Transaksi Terbaru
      </h4>
      <div className="p-6 bg-white rounded-b-lg">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="text-xs text-gray-800 uppercase bg-[#e0e7ff]">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Tipe</th>
              <th className="px-6 py-3">Jumlah</th>
              <th className="px-6 py-3">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 capitalize">{item.tipe}</td>
                <td className="px-6 py-4">
                  Rp. {item.jumlah.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

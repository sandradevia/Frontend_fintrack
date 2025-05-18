import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
} from "@roketid/windmill-react-ui";
import {
  EyeIcon,
  PlusIcon,
  PencilIcon as EditIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";

import AddBudgetModal from "./tambah";
import EditBudgetModal from "./edit";
import DetailBudgetModal from "./detail";
import DeleteBudgetModal from "./delete";
import { MoneyIcon } from "icons";

type Budget = {
  id: number;
  name: string;
  amount: number;
  spent: number;
  Date: Date;
};

const initialBudgets: Budget[] = [
  {
    id: 1,
    name: "Gaji Karyawan",
    amount: 4000000,
    spent: 4000000,
    Date: new Date("2025-03-01"),
  },
  {
    id: 2,
    name: "Listrik",
    amount: 1000000,
    spent: 950000,
    Date: new Date("2025-03-01"),
  },
  {
    id: 3,
    name: "PDAM",
    amount: 1000000,
    spent: 800000,
    Date: new Date("2025-03-01"),
  },
  {
    id: 4,
    name: "Kebutuhan Lapangan",
    amount: 500000,
    spent: 600000,
    Date: new Date("2025-03-01"),
  },
  {
    id: 5,
    name: "Kebutuhan Lainnya",
    amount: 500000,
    spent: 0,
    Date: new Date("2025-03-01"),
  },
];

function PerencanaanAnggaran() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filtered, setFiltered] = useState<Budget[]>(initialBudgets);
  const [selected, setSelected] = useState<Budget | null>(null);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [deleting, setDeleting] = useState<Budget | null>(null);
  const [adding, setAdding] = useState(false);
  const [newBudget, setNewBudget] = useState<Budget>({
    id: 0,
    name: "",
    amount: 0,
    Date: new Date(),
    spent: 0,
  });
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = setFiltered.length;
  useEffect(() => {
    const f = budgets.filter((b) =>
      b.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFiltered(f);
  }, [searchKeyword, budgets]);

  const handleAdd = () => {
    const id = budgets.length + 1;
    const budget = { ...newBudget, id };
    setBudgets([...budgets, budget]);
    setAdding(false);
    setNewBudget({ id: 0, name: "", amount: 0, spent: 0, Date: new Date() });
  };

  const handleEdit = () => {
    if (!editing) return;
    const updated = budgets.map((b) => (b.id === editing.id ? editing : b));
    setBudgets(updated);
    setEditing(null);
  };

  const handleDelete = () => {
    if (!deleting) return;
    const updated = budgets.filter((b) => b.id !== deleting.id);
    setBudgets(updated);
    setDeleting(null);
  };

  const paginated = filtered.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  const totalPlanned = budgets.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);
  const totalDifference = totalPlanned - totalSpent;

  return (
    <Layout>
      <PageTitle>Perencanaan Anggaran</PageTitle>

      <div className="flex flex-row gap-4 mb-4">
        <div className="bg-white px-6 py-4 rounded-lg shadow-md inline-flex min-w-[300px] max-w-fit h-[80px] items-center">
          <MoneyIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold">
            Total Anggaran Direncanakan: Rp{" "}
            {totalPlanned > 0 ? totalPlanned.toLocaleString("id-ID") : "-"}
          </h3>
        </div>

        <div className="bg-white px-6 py-4 rounded-lg shadow-md inline-flex min-w-[300px] max-w-fit h-[80px] items-center">
          <MoneyIcon className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-xl font-semibold">
            Total Pengeluaran: Rp{" "}
            {totalSpent > 0 ? totalSpent.toLocaleString("id-ID") : "-"}
          </h3>
        </div>

        <div className="bg-white px-6 py-4 rounded-lg shadow-md inline-flex min-w-[300px] max-w-fit h-[80px] items-center">
          <MoneyIcon className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-xl font-semibold">
            Total Selisih: Rp {totalDifference.toLocaleString("id-ID")}
          </h3>
        </div>
      </div>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">Perencanaan Anggaran</h3>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={() => setAdding(true)}
        >
          <PlusIcon className="w-4 h-4 mr-2" /> Tambah Data
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Cari anggaran..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-1/3 mb-4"
          />
        </div>

        <TableContainer className="max-w-[1400px] mx-auto overflow-x-auto mb-10">
          <Table>
            <TableHeader>
              <tr className="bg-indigo-100">
                <TableCell>No</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Jumlah Direncanakan</TableCell>
                <TableCell>Jumlah Dikeluarkan</TableCell>
                <TableCell>Selisih</TableCell>
                <TableCell>Persentase (%)</TableCell>
                <TableCell>Aksi</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {paginated.map((b, idx) => {
                const selisih = b.amount - b.spent;
                const persentase =
                  b.amount > 0
                    ? ((selisih / b.amount) * 100).toFixed(2)
                    : "0.00";
                return (
                  <TableRow key={b.id}>
                    <TableCell>
                      {idx + 1 + (page - 1) * resultsPerPage}
                    </TableCell>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>Rp {b.amount.toLocaleString()}</TableCell>
                    <TableCell>Rp {b.spent.toLocaleString()}</TableCell>
                    <TableCell>Rp {selisih.toLocaleString()}</TableCell>
                    <TableCell>{persentase}%</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          className="bg-blue-700 text-white"
                          onClick={() => setSelected(b)}
                        >
                          <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                        </Button>
                        <Button
                          size="small"
                          className="bg-yellow-400 text-black hover:bg-yellow-500"
                          onClick={() => setEditing(b)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="small"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => setDeleting(b)}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TableFooter>
            <div className="flex flex-col md:flex-row items-center justify-between p-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Show</span>
                <select
                  className="form-select w-20 text-sm"
                  value={resultsPerPage}
                  onChange={(e) => {
                    setResultsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-500 ml-2">entries</span>
              </div>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={setPage}
                label="Table navigation"
              />
            </div>
          </TableFooter>
        </TableContainer>
      </div>

      {/* Modals */}
      {adding && (
        <AddBudgetModal
          budget={newBudget}
          onChange={setNewBudget}
          onClose={() => setAdding(false)}
          onAdd={handleAdd}
        />
      )}
      {editing && (
        <EditBudgetModal
          budget={editing}
          onChange={setEditing}
          onClose={() => setEditing(null)}
          onSave={handleEdit}
        />
      )}
      {selected && (
        <DetailBudgetModal
          budget={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {deleting && (
        <DeleteBudgetModal
          budget={deleting}
          onClose={() => setDeleting(null)}
          onDelete={handleDelete}
        />
      )}
    </Layout>
  );
}

export default PerencanaanAnggaran;

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
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

import Layout from "example/containers/Layout";
import InfoCard from "example/components/Cards/InfoCard";
import { MoneyIcon, PeopleIcon } from "icons";
import RoundIcon from "example/components/RoundIcon";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import AddTransaksiModal from "../transaksi/tambah";
import EditTransaksiModal from "../transaksi/edit";
import DetailTransaksiModal from "../transaksi/detail";

interface TransaksiData {
  transactionId: string;
  category: string;
  amount: number;
  transactionDate: string;
  type: string;
  description: string;
  branchId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  isLocked?: boolean;
}

function ManajemenTransaksi() {
  const [data, setData] = useState<TransaksiData[]>([
    { transactionId: "1", category: "Gaji", amount: 5000, transactionDate: "2023-05-01", type: "Pemasukan", description: "Gaji bulan ini",  isLocked: false },
    { transactionId: "2", category: "Reservasi", amount: 1500, transactionDate: "2023-05-02", type: "Pengeluaran", description: "Reservasi Lapangan Futsal",  isLocked: false },
    { transactionId: "3", category: "PDAM", amount: 200, transactionDate: "2023-05-03", type: "Pengeluaran", description: "Tagihan PDAM",  isLocked: false },
  ]);
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<TransaksiData[]>(data);
  const [selectedTransaction, setSelectedTransaction] = useState<TransaksiData | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<TransaksiData | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<TransaksiData | null>(null);
  const [addingTransaction, setAddingTransaction] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState<Partial<TransaksiData>>({
    transactionId: "",
    category: "",
    amount: 0,
    transactionDate: "",
    type: "",
    description: "",
    branchId: "2",
  });

  const resultsPerPage = 10;

  useEffect(() => {
    const filtered = data.filter((transaction) =>
      transaction.category.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTransactions(filtered);

    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    setData(filtered.slice(startIndex, endIndex));
  }, [searchKeyword, page]);

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  const saveEdit = () => {
    if (!editingTransaction) return;
    const updatedList = data.map((transaction) =>
      transaction.transactionId === editingTransaction.transactionId
        ? editingTransaction
        : transaction
    );
    setData(updatedList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setEditingTransaction(null);
  };

  const viewTransactionDetails = (transaction: TransaksiData) => {
    setSelectedTransaction(transaction);
  };

  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };

  const handleEditClick = (transaction: TransaksiData) => {
    setEditingTransaction({ ...transaction });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editingTransaction) {
      setEditingTransaction({
        ...editingTransaction,
        [name]: value,
      });
    }
  };

  const confirmDeleteTransaction = (transaction: TransaksiData) => {
    setDeletingTransaction(transaction);
  };

  const cancelDelete = () => {
    setDeletingTransaction(null);
  };

  const deleteTransaction = () => {
    if (!deletingTransaction) return;
    const filtered = data.filter(
      (transaction) =>
        transaction.transactionId !== deletingTransaction.transactionId
    );
    setData(filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setDeletingTransaction(null);
  };

  const handleAddTransaction = () => {
    if (
      newTransaction.category &&
      newTransaction.amount !== undefined &&
      newTransaction.transactionDate &&
      newTransaction.type
    ) {
      const newTransactionId = (
        parseInt(data[data.length - 1]?.transactionId || "0") + 1
      ).toString();
  
      const newTransactionData: TransaksiData = {
        transactionId: newTransactionId,
        branchId: newTransaction.branchId, // fallback
        userId: "1",
        type: newTransaction.type,
        category: newTransaction.category,
        amount: newTransaction.amount,
        description: newTransaction.description || "",
        transactionDate: newTransaction.transactionDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      const updatedData = [...data, newTransactionData];
      setData(updatedData.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      setAddingTransaction(false);
      setNewTransaction({
        category: "",
        amount: 0,
        transactionDate: "",
        description: "",
        type: "",
        branchId: "2", //ini harusnya ikut auth tapi ga ngerti codingane
      });
    }
  };
  
  const handleLockTransaksi = (transactionId: string) => {
    const updated = data.map((item) =>
      item.transactionId === transactionId
        ? { ...item, isLocked: true }
        : item
    );
    setData(updated);
    setFilteredTransactions(updated);
  };
  
  

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manajemen Transaksi</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center ">
          <CalendarDaysIcon className="w-8 h-8 text-blue-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Transaksi Hari Ini</p>
            <p className="text-xl font-semibold text-gray-800">3</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <ClipboardDocumentListIcon className="w-8 h-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Transaksi</p>
            <p className="text-xl font-semibold text-gray-800">10</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <LockClosedIcon className="w-8 h-8 text-red-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Transaksi Terkunci</p>
            <p className="text-xl font-semibold text-gray-800">2</p>
          </div>
        </div>
      </div>

        {/* Keterangan Warna */}
        <div className="flex items-center space-x-4 px-4 pt-4 mb-6"> 
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-gray-400" />
            <span className="text-sm text-gray-700">Pemasukan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-gray-400" />
            <span className="text-sm text-gray-700">Pengeluaran</span>
          </div>
        </div>

        {/* Header Table */}
        <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">List Transaksi</h3>
          <Button
            size="small"
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
            onClick={() => setAddingTransaction(true)}
          >
            <PlusIcon className="w-4 h-4" /> <span>Tambah Transaksi</span>
          </Button>
        </div>

        {/* Table & Search */}
        <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Search Kategori"
            className="w-1/3 mb-4"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <TableContainer className="max-w-[1400px] mx-auto overflow-x-auto mb-10">
          <Table className="w-full border border-gray-300">
            <TableHeader>
              <tr className="bg-indigo-100">
                <TableCell>No</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Jumlah</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Aksi</TableCell>
                <TableCell>Keterangan</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((transaction, index) => (
                <TableRow
                  key={transaction.transactionId}
                  className={
                    transaction.category.toLowerCase() === "reservasi"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }
                >
                  <TableCell className="border-t border-r">
                    {(page - 1) * resultsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="border-t border-r">
                    {transaction.category}
                  </TableCell>
                  <TableCell className="border-t border-r ">
                    Rp{Number(transaction.amount).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="border-t border-r ">
                    {new Date(transaction.transactionDate).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="border-t border-r">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="border-t">
                    <div className="flex space-x-2">
                      <Button
                        size="small"
                        className="bg-blue-700 text-white"
                        onClick={() => viewTransactionDetails(transaction)}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                      </Button>
                      <Button
                        size="small"
                        className="bg-yellow-400 text-black hover:bg-yellow-500"
                        onClick={() => setEditingTransaction(transaction)}
                        disabled={transaction.isLocked}
                      >
                        <EditIcon className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="small"
                        className="bg-gray-700 text-white hover:bg-gray-800"
                        onClick={() => handleLockTransaksi(transaction.transactionId)}
                        disabled={transaction.isLocked}
                      >
                        🔒 {transaction.isLocked ? "Terkunci" : "Kunci"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
             <Pagination
               totalResults={filteredTransactions.length}
               resultsPerPage={resultsPerPage}
               onChange={setPage}
               label="Navigasi halaman"
             />
           </TableFooter>
        </TableContainer>
        </div>

        {/* Popups */}
        {addingTransaction && (
          <AddTransaksiModal
            addingTransaction={addingTransaction}
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
            setAddingTransaction={setAddingTransaction}
            handleAddTransaction={handleAddTransaction}
          />
        )}


        {selectedTransaction && (
          <DetailTransaksiModal
            selectedTransaction={selectedTransaction}
            closeTransactionDetails={closeTransactionDetails}
          />
        )}

        {editingTransaction && (
          <EditTransaksiModal
            editingTransaction={editingTransaction}
            handleEditChange={handleEditChange}
            cancelEdit={cancelEdit}
            saveEdit={saveEdit}
          />
        )}
      </div>
    </Layout>
  );
};

export default ManajemenTransaksi;
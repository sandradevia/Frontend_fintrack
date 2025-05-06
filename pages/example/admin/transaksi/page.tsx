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
import transaksiData, { TransaksiData } from "utils/admin/transaksiData";
import Layout from "example/containers/Layout";
import InfoCard from "example/components/Cards/InfoCard";
import { MoneyIcon, PeopleIcon } from "icons";
import RoundIcon from "example/components/RoundIcon";

const TransactionTable: React.FC = () => {
  const [data, setData] = useState<TransaksiData[]>(transaksiData);
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransaksiData[]>(transaksiData);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransaksiData | null>(null);
  const [editingTransaction, setEditingTransaction] =
    useState<TransaksiData | null>(null);
  const [deletingTransaction, setDeletingTransaction] =
    useState<TransaksiData | null>(null);
  const [addingTransaction, setAddingTransaction] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState<Partial<TransaksiData>>({
    category: "",
    amount: "",
    transactionDate: "",
    description: "",
    type: "",
    branchId: "",
  });

  const resultsPerPage = 10;

  useEffect(() => {
    const filtered = transaksiData.filter((transaction) =>
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
    const updatedList = transaksiData.map((transaction) =>
      transaction.transactionId === editingTransaction.transactionId
        ? editingTransaction
        : transaction
    );
    setData(
      updatedList.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
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
    if (!editingTransaction) return;
    const { name, value } = e.target;
    setEditingTransaction({ ...editingTransaction, [name]: value });
  };

  const confirmDeleteTransaction = (transaction: TransaksiData) => {
    setDeletingTransaction(transaction);
  };

  const cancelDelete = () => {
    setDeletingTransaction(null);
  };

  const deleteTransaction = () => {
    if (!deletingTransaction) return;
    const filtered = transaksiData.filter(
      (transaction) =>
        transaction.transactionId !== deletingTransaction.transactionId
    );
    setData(filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setDeletingTransaction(null);
  };

  const handleAddTransaction = () => {
    if (
      newTransaction.category &&
      newTransaction.amount &&
      newTransaction.transactionDate &&
      newTransaction.type &&
      newTransaction.branchId
    ) {
      const newTransactionId = (
        parseInt(transaksiData[transaksiData.length - 1].transactionId) + 1
      ).toString();
      const newTransactionData: TransaksiData = {
        transactionId: newTransactionId,
        branchId: newTransaction.branchId,
        userId: "1", // Default userId
        type: newTransaction.type,
        category: newTransaction.category,
        amount: newTransaction.amount,
        description: newTransaction.description || "",
        transactionDate: newTransaction.transactionDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      transaksiData.push(newTransactionData);
      setData(
        transaksiData.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
      setAddingTransaction(false);
      setNewTransaction({
        category: "",
        amount: "",
        transactionDate: "",
        description: "",
        type: "",
        branchId: "",
      });
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manajemen Transaksi</h2>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Transaksi Hari Ini" value="3">
            {/* @ts-ignore */}
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Total Transaksi" value="10">
            {/* @ts-ignore */}
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
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

        <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
          <div className="p-4">
            <Input
              placeholder="🔍 Search Kategori"
              className="w-1/3 mb-4"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <tr className="bg-indigo-100">
                  <TableCell>No</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Aksi</TableCell>
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
                    <TableCell>
                      {(page - 1) * resultsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      Rp {parseInt(transaction.amount).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.transactionDate).toLocaleDateString(
                        "id-ID"
                      )}
                    </TableCell>
                    <TableCell>
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
                          onClick={() => handleEditClick(transaction)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="small"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => confirmDeleteTransaction(transaction)}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" /> Hapus
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
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </div>

        {/* Pop-up Add Transaction */}
        {addingTransaction && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
              <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
                <h3 className="text-lg font-bold">Tambah Transaksi</h3>
                <Button
                  className="bg-transparent text-white hover:bg-transparent hover:text-white"
                  onClick={() => setAddingTransaction(false)}
                >
                  <span className="text-xl">×</span>
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block font-medium">Tipe</label>
                  <select
                    className="w-full mt-1 border-gray-300 rounded-md"
                    value={newTransaction.type || ""}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Pilih Tipe --</option>
                    <option value="Pemasukan">Pemasukan</option>
                    <option value="Pengeluaran">Pengeluaran</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Kategori</label>
                  <Input
                    name="category"
                    value={newTransaction.category || ""}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium">Jumlah</label>
                  <Input
                    type="number"
                    name="amount"
                    value={newTransaction.amount || ""}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium">Tanggal</label>
                  <Input
                    type="date"
                    name="transactionDate"
                    value={newTransaction.transactionDate || ""}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        transactionDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium">Deskripsi</label>
                  <Input
                    name="description"
                    value={newTransaction.description || ""}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 p-4 border-t">
                <Button
                  className="bg-red-700 text-white hover:bg-[#FF0404]"
                  onClick={() => setAddingTransaction(false)}
                >
                  Batal
                </Button>
                <Button
                  className="bg-[#2B3674] text-white hover:bg-blue-700"
                  onClick={handleAddTransaction}
                >
                  Tambah
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up Detail Transaction */}
        {selectedTransaction && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
              <div className="flex justify-between items-center bg-[#2B3674] text-white p-1 rounded-t-lg">
                <h3 className="text-xl font-semibold">Detail Transaksi</h3>
                <Button
                  className="bg-transparent text-white hover:bg-transparent hover:text-white"
                  onClick={closeTransactionDetails}
                >
                  <span className="text-white text-xl">×</span>
                </Button>
              </div>
              <div className="space-y-2 mt-4 p-3">
                <div className="flex">
                  <div className="w-1/3 font-medium">Kategori</div>
                  <div className="w-1/12">:</div>
                  <div className="font-bold">
                    {selectedTransaction.category}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium">Jumlah</div>
                  <div className="w-1/12">:</div>
                  <div className="font-bold">
                    Rp{" "}
                    {parseInt(selectedTransaction.amount).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium">Tanggal</div>
                  <div className="w-1/12">:</div>
                  <div className="font-bold">
                    {new Date(
                      selectedTransaction.transactionDate
                    ).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium">Tipe</div>
                  <div className="w-1/12">:</div>
                  <div className="font-bold">{selectedTransaction.type}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium">Deskripsi</div>
                  <div className="w-1/12">:</div>
                  <div className="font-bold">
                    {selectedTransaction.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up Edit Transaction */}
        {editingTransaction && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
              <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
                <h3 className="text-lg font-bold">Edit Transaksi</h3>
                <Button
                  className="bg-transparent text-white hover:bg-transparent hover:text-white"
                  onClick={cancelEdit}
                >
                  <span className="text-xl">×</span>
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block font-medium">Tipe</label>
                  <select
                    className="w-full mt-1 border-gray-300 rounded-md"
                    name="type"
                    value={editingTransaction.type}
                    onChange={handleEditChange}
                  >
                    <option value="">-- Pilih Tipe --</option>
                    <option value="Pemasukan">Pemasukan</option>
                    <option value="Pengeluaran">Pengeluaran</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Kategori</label>
                  <Input
                    name="category"
                    value={editingTransaction.category}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label className="block font-medium">Jumlah</label>
                  <Input
                    type="number"
                    name="amount"
                    value={editingTransaction.amount}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label className="block font-medium">Tanggal</label>
                  <Input
                    type="date"
                    name="transactionDate"
                    value={editingTransaction.transactionDate}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label className="block font-medium">Deskripsi</label>
                  <Input
                    name="description"
                    value={editingTransaction.description}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 p-4 border-t">
                <Button
                  className="bg-red-700 text-white hover:bg-[#FF0404]"
                  onClick={cancelEdit}
                >
                  Batal
                </Button>
                <Button
                  className="bg-[#2B3674] text-white hover:bg-blue-700"
                  onClick={saveEdit}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up Delete Transaction */}
        {deletingTransaction && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px]">
              <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
                <h3 className="text-lg font-bold">Hapus Transaksi</h3>
                <Button
                  className="bg-transparent text-white hover:bg-transparent hover:text-white"
                  onClick={cancelDelete}
                >
                  <span className="text-xl">×</span>
                </Button>
              </div>
              <div className="p-4">
                <p>
                  Apakah Anda yakin ingin menghapus transaksi{" "}
                  {deletingTransaction.category}?
                </p>
              </div>
              <div className="flex justify-end space-x-2 p-4 border-t">
                <Button
                  className="bg-gray-500 text-white hover:bg-gray-700"
                  onClick={cancelDelete}
                >
                  Batal
                </Button>
                <Button
                  className="bg-red-700 text-white hover:bg-red-800"
                  onClick={deleteTransaction}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TransactionTable;

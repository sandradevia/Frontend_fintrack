import React, { useState } from 'react';
import { Button, Input } from '@roketid/windmill-react-ui';

interface TransaksiData {
  transactionId?: string;
  category?: string;
  amount?: number;
  transactionDate?: string;
  type?: string;
  description?: string;
  branchId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AddTransaksiModalProps {
  addingTransaction: boolean;
  newTransaction: Partial<TransaksiData>; // Ubah jadi Partial
  setNewTransaction: React.Dispatch<React.SetStateAction<Partial<TransaksiData>>>;
  setAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTransaction: () => void;
}

const AddTransactionModal: React.FC<AddTransaksiModalProps> = ({
  addingTransaction,
  newTransaction,
  setNewTransaction,
  setAddingTransaction,
  handleAddTransaction,
}) => {
  // If addingTransaction is false, don't render the modal
  if (!addingTransaction) return null;

  // Handle changes in the form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Cast 'name' to keyof TransaksiData to make TypeScript happy
    if (name in newTransaction) {
      const key = name as keyof TransaksiData;

      // If the field is 'amount', ensure the value is a number
      if (key === 'amount') {
        setNewTransaction({
          ...newTransaction,
          [key]: value ? Number(value) : 0, // Convert to number or default to 0
        });
      } else {
        setNewTransaction({
          ...newTransaction,
          [key]: value,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-3 rounded-t-lg">
          <h3 className="text-lg font-bold">Tambah Transaksi</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={() => setAddingTransaction(false)}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>

        {/* Form Fields */}
        <div className="p-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">Tipe</label>
          <select
            className={`w-full mt-1 border-gray-300 rounded-md ${
              newTransaction.type === "Pemasukan"
                ? "bg-green-100"
                : newTransaction.type === "Pengeluaran"
                ? "bg-red-100"
                : ""
            }`}
            value={newTransaction.type || ""}
            onChange={handleInputChange}
            name="type"
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
              onChange={handleInputChange}
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
                  amount: Number(e.target.value),
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
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-medium">Deskripsi</label>
            <Input
              name="description"
              value={newTransaction.description || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button
            className="bg-red-700 text-white hover:bg-[#FF0404]"
            onClick={() => setAddingTransaction(false)}
          >
            Batal
          </Button>
          <Button
            disabled={!newTransaction.category || !newTransaction.amount || !newTransaction.transactionDate}
            className="bg-[#2B3674] text-white hover:bg-blue-700"
            onClick={handleAddTransaction}
          >
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;

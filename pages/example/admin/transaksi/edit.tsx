import React from 'react';
import { Button, Input } from '@roketid/windmill-react-ui';

interface Transaction {
  category: string;
  amount: number | string;
  transactionDate: string;
  type: string;
  description: string;
}

interface Props {
  editingTransaction: Transaction | null;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  cancelEdit: () => void;
  saveEdit: () => void;
}

const EditTransactionModal: React.FC<Props> = ({
  editingTransaction,
  handleEditChange,
  cancelEdit,
  saveEdit,
}) => {
  if (!editingTransaction) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-3 rounded-t-lg">
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
          <Button layout="outline" onClick={cancelEdit}>
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
  );
};

export default EditTransactionModal;

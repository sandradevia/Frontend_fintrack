import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

interface Transaction {
  category: string;
  amount: number | string;
  transactionDate: string;
  type: string;
  description: string;
}

interface Props {
  selectedTransaction: Transaction | null;
  closeTransactionDetails: () => void;
}

const TransactionDetailModal: React.FC<Props> = ({
  selectedTransaction,
  closeTransactionDetails,
}) => {
  if (!selectedTransaction) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-3 rounded-t-lg">
          <h3 className="text-xl font-semibold">Detail Transaksi</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={closeTransactionDetails}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3 mt-4 p-4">
          <DetailItem label="Kategori" value={selectedTransaction.category} />
          <DetailItem
            label="Jumlah"
            value={
              'Rp ' +
              parseInt(selectedTransaction.amount as string).toLocaleString('id-ID')
            }
          />
          <DetailItem
            label="Tanggal"
            value={new Date(
              selectedTransaction.transactionDate
            ).toLocaleDateString('id-ID')}
          />
          <DetailItem label="Tipe" value={selectedTransaction.type} />
          <DetailItem label="Deskripsi" value={selectedTransaction.description} />
        </div>
      </div>
    </div>
  );
};

// Komponen kecil untuk baris detail
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex">
    <div className="w-1/3 font-medium">{label}</div>
    <div className="w-1/12">:</div>
    <div className="font-bold">{value}</div>
  </div>
);

export default TransactionDetailModal;

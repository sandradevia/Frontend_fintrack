import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    branch: string;
    month: string;
    year: number;
    pemasukan: number;
    pengeluaran: number;
  } | null;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-900 px-6 py-4">
          <h4 className="text-lg font-semibold text-white">Detail Rekaptulasi</h4>
        </div>

        <div className="bg-white px-6 py-4 space-y-2 text-sm text-gray-800">
          <p><strong>Cabang:</strong> {item.branch}</p>
          <p><strong>Bulan:</strong> {item.month}</p>
          <p><strong>Tahun:</strong> {item.year}</p>
          <p><strong>Pemasukan:</strong> {formatCurrency(item.pemasukan)}</p>
          <p><strong>Pengeluaran:</strong> {formatCurrency(item.pengeluaran)}</p>
          <p><strong>Total Akhir:</strong> {formatCurrency(item.pemasukan - item.pengeluaran)}</p>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-4 text-right border-t">
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;

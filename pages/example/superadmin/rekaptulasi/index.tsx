import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
  Input,
} from '@roketid/windmill-react-ui';
import {
  EyeIcon,
  PlusIcon,
  PencilIcon as EditIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';

import Layout from 'example/containers/Layout';
import PageTitle from 'example/components/Typography/PageTitle';
import DetailModal from './component/detail';
import DownloadModal from './component/download';
import { exportPDF, exportExcel } from './untils/exportHandlers';

const branches = ['Cabang A', 'Cabang B', 'Cabang C'];

const RekaptulasiPage = () => {
  const [data, setData] = useState([
    { id: 1, branch: 'Cabang A', month: 'Januari', year: 2023, pemasukan: 1000000, pengeluaran: 400000 },
    { id: 2, branch: 'Cabang B', month: 'Februari', year: 2023, pemasukan: 1500000, pengeluaran: 500000 },
    { id: 3, branch: 'Cabang C', month: 'Maret', year: 2022, pemasukan: 2000000, pengeluaran: 600000 },
  ]);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedYear, setSelectedYear] = useState<string>('2023');
  const [selectedBranch, setSelectedBranch] = useState<string>('Cabang A');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // Modal detail
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleFilterChange = () => {
    const filtered = data.filter(
      (item) =>
        item.year.toString() === selectedYear &&
        item.branch === selectedBranch &&
        (selectedMonth ? item.month === selectedMonth : true) &&
        item.branch.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchKeyword, selectedMonth, selectedYear, selectedBranch]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  const handleLihat = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleEdit = (item: any) => {
    alert(`Edit data untuk ID ${item.id}`);
  };

  const handleHapus = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
  };

  function setShowPDFModal(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  function setShowExcelModal(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <Layout>
      <PageTitle>Rekaptulasi</PageTitle>

      <div className="flex space-x-4 mb-6">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Pilih Bulan
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-1"
          >
            <option value="">Pilih Bulan</option>
            {[...Array(12)].map((_, i) => {
              const val = String(i + 1).padStart(2, '0');
              const bulan = new Date(0, i).toLocaleString('id-ID', { month: 'long' });
              return (
                <option key={val} value={val}>
                  {bulan}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Pilih Tahun
          </label>
          <Input
            id="year"
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
            Pilih Cabang
          </label>
          <select
            id="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="mt-1"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">List Cabang</h3>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto p-4 mb-4">
        <Input
          placeholder="Search Cabang"
          className="w-1/3"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#CFD7F2] text-black font-bold mt-6">
                <TableCell>ID</TableCell>
                <TableCell>CABANG</TableCell>
                <TableCell>BULAN</TableCell>
                <TableCell>TAHUN</TableCell>
                <TableCell>PEMASUKAN</TableCell>
                <TableCell>PENGELUARAN</TableCell>
                <TableCell>TOTAL AKHIR</TableCell>
                <TableCell>AKSI</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{formatCurrency(item.pemasukan)}</TableCell>
                  <TableCell>{formatCurrency(item.pengeluaran)}</TableCell>
                  <TableCell>{formatCurrency(item.pemasukan - item.pengeluaran)}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="small"
                      className="bg-blue-700 text-white"
                      layout="link"
                      aria-label="Lihat Detail"
                      onClick={() => handleLihat(item)}
                    >
                      <EyeIcon className="w-5 h-5" />Lihat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mt-6 w-full max-w-xl shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
          <h4 className="text-lg font-semibold">Unduh Rekaptulasi</h4>
        </div>

        <div className="bg-white px-6 py-4 text-sm text-gray-800 space-y-1">
          <p>Cabang: {selectedBranch || 'Semua Cabang'}</p>
          <p>Bulan: {selectedMonth || 'Semua Bulan'}</p>
          <p>Tahun: {selectedYear || 'Semua Tahun'}</p>
          <p>Jenis Laporan: Rekapitulasi</p>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              exportPDF({ branch: selectedBranch, month: selectedMonth, year: selectedYear });
              setShowPDFModal(true);
            }}
          >
            Download PDF
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              exportExcel({ branch: selectedBranch, month: selectedMonth, year: selectedYear });
              setShowExcelModal(true);
            }}
          >
            Download Excel
          </Button>
        </div>
      </div>
      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        item={selectedItem}
      />
    </Layout>
  );
};

export default RekaptulasiPage;

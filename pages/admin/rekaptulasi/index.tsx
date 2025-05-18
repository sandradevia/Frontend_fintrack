import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Button,
  Input,
  Badge,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
} from '@roketid/windmill-react-ui';
import {
  DocumentTextIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import Layout from 'example/containers/Layout';
import PageTitle from 'example/components/Typography/PageTitle';

// Define types
type Transaction = {
  id: string;
  date: string;
  type: string;
  member: string;
  amount: number;
  method: string;
};

type FinancialRecord = {
  id: number;
  branch: string;
  month: string;
  year: number;
  pemasukan: number;
  pengeluaran: number;
  isLocked: boolean;
  lastUpdated: string;
  transactions: Transaction[];
};

// Constants
const branches = ['Cabang Jakarta', 'Cabang Bandung', 'Cabang Surabaya', 'Cabang Bali', 'Cabang Yogyakarta'];
const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const transactionTypes = ['Membership', 'Kelas', 'Lapangan', 'Merchandise', 'Lainnya'];
const paymentMethods = ['Cash', 'Transfer Bank', 'Credit Card', 'E-Wallet'];
const members = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'];

// Generate financial data
const generateFinancialData = (): FinancialRecord[] => {
  const years = [2024, 2025];
  const data: FinancialRecord[] = [];
  
  let id = 1;
  branches.forEach(branch => {
    years.forEach(year => {
      months.forEach(month => {
        let income = 5000000 + Math.floor(Math.random() * 10000000);
        let expense = 3000000 + Math.floor(Math.random() * 5000000);
        
        if (['Juni', 'Juli', 'Desember'].includes(month)) {
          income = Math.round(income * 1.3);
        }
        
        if (['Januari', 'Februari'].includes(month)) {
          income = Math.round(income * 0.8);
        }
        
        if (year === 2023) {
          income = Math.round(income * 1.2);
          expense = Math.round(expense * 1.1);
        }
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = months[currentDate.getMonth()];
        const isLocked = !(year === currentYear && month === currentMonth);
        
        const transactions: Transaction[] = [];
        const transactionCount = 5 + Math.floor(Math.random() * 10);
        
        for (let i = 0; i < transactionCount; i++) {
          transactions.push({
            id: `TRX-${id}-${i}`,
            date: `${year}-${months.indexOf(month)+1}-${Math.floor(Math.random() * 28) + 1}`,
            type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
            member: members[Math.floor(Math.random() * members.length)],
            amount: Math.round((50000 + Math.random() * 2000000) / 1000) * 1000,
            method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
          });
        }
        
        data.push({
          id: id++,
          branch,
          month,
          year,
          pemasukan: income,
          pengeluaran: expense,
          isLocked,
          lastUpdated: `${year}-${months.indexOf(month)+1}-${month === 'Februari' ? 28 : 30}`,
          transactions
        });
      });
    });
  });
  
  return data;
};

const RekaptulasiPage = () => {
  // Data state
  const [data, setData] = useState<FinancialRecord[]>(generateFinancialData());
  const [filteredData, setFilteredData] = useState<FinancialRecord[]>(data);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedBranch, setSelectedBranch] = useState('Semua Cabang');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = filteredData.length;

  // Export state
  const [exportState, setExportState] = useState<{
    status: 'idle' | 'exporting_pdf' | 'exporting_excel';
    error: string | null;
  }>({
    status: 'idle',
    error: null
  });

  // Filter data
  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.year.toString() === selectedYear &&
        (selectedBranch === 'Semua Cabang' || item.branch === selectedBranch) &&
        (selectedMonth ? item.month === selectedMonth : true) &&
        item.branch.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(1);
  }, [searchKeyword, selectedMonth, selectedYear, selectedBranch, data]);

  // Format currency
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Export handlers
  const handleExportPDF = async () => {
    setExportState({ status: 'exporting_pdf', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Mengunduh laporan PDF untuk:
      Cabang: ${selectedBranch === 'Semua Cabang' ? 'Semua Cabang' : selectedBranch}
      Periode: ${selectedMonth || 'Semua Bulan'} ${selectedYear}`);
    } catch (error) {
      setExportState({
        status: 'idle',
        error: 'Gagal mengekspor PDF'
      });
    } finally {
      setExportState(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const handleExportExcel = async () => {
    setExportState({ status: 'exporting_excel', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Mengunduh laporan Excel untuk:
      Cabang: ${selectedBranch === 'Semua Cabang' ? 'Semua Cabang' : selectedBranch}
      Periode: ${selectedMonth || 'Semua Bulan'} ${selectedYear}`);
    } catch (error) {
      setExportState({
        status: 'idle',
        error: 'Gagal mengekspor Excel'
      });
    } finally {
      setExportState(prev => ({ ...prev, status: 'idle' }));
    }
  };

  return (
    <Layout>
      <PageTitle>Rekaptulasi & Tutup Buku</PageTitle>

      {/* Status Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-3 mr-4 rounded-full bg-blue-100 text-blue-500">
            <DocumentTextIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Periode Aktif</p>
            <p className="text-lg font-semibold">
              {selectedMonth || 'Semua Bulan'} {selectedYear}
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-3 mr-4 rounded-full bg-green-100 text-green-500">
            <CheckIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            <p className="text-lg font-semibold">
              {selectedMonth && data.some(d => d.month === selectedMonth && d.isLocked) 
                ? 'Terkunci' 
                : 'Belum Ditutup'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="w-full md:w-auto">
        </div>

        <div className="w-full md:w-auto">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Bulan
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Semua Bulan</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Tahun
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="w-full md:w-auto mt-auto">
          <Button 
            layout="outline" 
            onClick={() => {
              setSelectedMonth('');
              setSelectedYear('2025');
              setSearchKeyword('');
            }}
          >
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Data Rekapitulasi</h3>
          <Input
            placeholder="Cari cabang..."
            className="w-64"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <TableContainer>
          <Table id="rekapitulasi-table">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableCell>No</TableCell>
                <TableCell>Periode</TableCell>
                <TableCell>Pemasukan</TableCell>
                <TableCell>Pengeluaran</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData
                .slice((page - 1) * resultsPerPage, page * resultsPerPage)
                .map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{(page - 1) * resultsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {item.month} {item.year}
                      <div className="text-xs text-gray-500">
                        Update: {formatDate(item.lastUpdated)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.pemasukan)}
                      <div className="text-xs text-gray-500">
                        {item.transactions.length} transaksi
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.pengeluaran)}</TableCell>
                    <TableCell className={`font-semibold ${
                      item.pemasukan - item.pengeluaran >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(item.pemasukan - item.pengeluaran)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        type={item.isLocked ? "success" : "warning"}
                      >
                        {item.isLocked ? 'Terkunci' : 'Terbuka'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
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

      {/* Export Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8 w-full md:w-1/2">
        <div className="bg-indigo-900 text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Unduh Rekapitulasi</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-700 mb-2">Informasi Laporan</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Cabang:</span> {selectedBranch === 'Semua Cabang' ? 'Semua Cabang' : selectedBranch}
              </p>
              <p>
                <span className="font-medium">Periode:</span> {selectedMonth || 'Semua Bulan'} {selectedYear}
              </p>
              <p>
                <span className="font-medium">Jenis:</span> Rekapitulasi Bulanan
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-end">
            <Button 
              className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2"
              onClick={handleExportPDF}
              disabled={exportState.status === 'exporting_pdf'}
            >
              {exportState.status === 'exporting_pdf' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Download PDF
                </span>
              )}
            </Button>
            
            <Button 
              className="flex items-center bg-green-600 text-white hover:bg-green-700 px-4 py-2"
              onClick={handleExportExcel}
              disabled={exportState.status === 'exporting_excel'}
            >
              {exportState.status === 'exporting_excel' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Download Excel
                </span>
              )}
            </Button>
          </div>

          {exportState.error && (
            <div className="mt-4 text-red-500 text-sm">
              {exportState.error}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RekaptulasiPage;
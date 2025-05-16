import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableCell, TableBody, TableRow,
  TableFooter, TableContainer, Button, Pagination, Input
} from '@roketid/windmill-react-ui';
import {
  EyeIcon, PencilIcon as EditIcon
} from '@heroicons/react/24/solid';
import Layout from 'example/containers/Layout';
import PageTitle from 'example/components/Typography/PageTitle';
import { MoneyIcon } from 'icons';

type POSRecord = {
  id: number;
  reservationId: string;
  totalPayment: number;
  status: 'lunas' | 'belum lunas';
  isLocked: boolean;
};

// Data dummy
const initialPOSData: POSRecord[] = [
  { id: 1, reservationId: 'RES-001', totalPayment: 250000, status: 'lunas', isLocked: false },
  { id: 2, reservationId: 'RES-002', totalPayment: 180000, status: 'lunas', isLocked: false },
  { id: 3, reservationId: 'RES-003', totalPayment: 300000, status: 'belum lunas', isLocked: true },
];

function POS() {
  const [records, setRecords] = useState<POSRecord[]>(initialPOSData);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filtered, setFiltered] = useState<POSRecord[]>(initialPOSData);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const f = records.filter(r =>
      r.reservationId.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFiltered(f);
  }, [searchKeyword, records]);

  const paginated = filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage);
  const totalIncome = records.reduce((acc, curr) => acc + curr.totalPayment, 0);

  const viewTransactionDetails = (transaction: POSRecord) => {
    console.log('Lihat transaksi:', transaction);
  };

  const setEditingTransaction = (transaction: POSRecord) => {
    console.log('Edit transaksi:', transaction);
  };

  return (
    <Layout>
      <PageTitle>Point Of Sales</PageTitle>

      <div className="flex flex-row gap-4 mb-4">
        <div className="bg-white px-6 py-4 rounded-lg shadow-md inline-flex min-w-[300px] max-w-fit h-[80px] items-center">
          <MoneyIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold">
            Total Pemasukan dari POS: Rp {totalIncome > 0 ? totalIncome.toLocaleString('id-ID') : '-'}
          </h3>
        </div>
      </div>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">Tabel Pemasukan Dari POS</h3>
      </div>

      <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Cari reservasi..."
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
                <TableCell>Reservasi ID</TableCell>
                <TableCell>Total Pembayaran</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {paginated.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * resultsPerPage + index + 1}</TableCell>
                  <TableCell>{item.reservationId}</TableCell>
                  <TableCell>Rp {item.totalPayment.toLocaleString('id-ID')}</TableCell>
                  <TableCell className="border-t">
                    <div className="flex space-x-2">
                      {item.status === 'lunas' ? (
                        <Button
                          size="small"
                          className="bg-[#40FF2D] text-black w-40"
                        > Lunas
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          className="bg-[#FF0404] text-black w-40"
                        > Uang Muka
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={filtered.length}
              resultsPerPage={resultsPerPage}
              onChange={setPage}
              label="Navigasi halaman"
            />
          </TableFooter>
        </TableContainer>
      </div>
    </Layout>
  );
}

export default POS;

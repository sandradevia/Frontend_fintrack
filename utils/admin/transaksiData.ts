interface TransaksiData {
  transactionId: string;
  branchId: string;
  userId: string;
  type: string;
  category: string;
  amount: string;
  description: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

const transaksiData: TransaksiData[] = [
  {
    transactionId: "1",
    branchId: "1",
    userId: "1",
    type: "Pengeluaran",
    category: "Gaji",
    amount: "5000000",
    description: "Gaji Bulan Januari",
    transactionDate: "2023-01-31",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    transactionId: "1",
    branchId: "1",
    userId: "1",
    type: "Pemasukan",
    category: "Reservasi",
    amount: "5000000",
    description: "Gaji Bulan Januari",
    transactionDate: "2023-01-31",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    transactionId: "1",
    branchId: "1",
    userId: "1",
    type: "Pengeluaran",
    category: "Gaji",
    amount: "5000000",
    description: "Gaji Bulan Januari",
    transactionDate: "2023-01-31",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
];

export default transaksiData;
export type { TransaksiData };

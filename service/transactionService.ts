import axios from "../lib/axios";
import {
  Transaction,
  UpdateTransaction,
  CreateTransaction,
  LockTransaction,
} from "types/transaction";

type TransactionResponse = {
  data: Transaction[];
  meta: {
    status: string;
    total: number;
    today_count: number;
    locked_count: number;
  };
};

export const getTransactions = async (): Promise<TransactionResponse> => {
  const response = await axios.get("/transaction-detail");
  return response.data;
};

export const getTransactionsByBranch = async (
  branchId: number
): Promise<TransactionResponse> => {
  const response = await axios.get("/transaction-branch/" + branchId);
  return response.data;
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  const response = await axios.get<{ data: Transaction }>("/transaction/" + id);
  return response.data.data;
};

export const createTransaction = async (
  data: CreateTransaction
): Promise<Transaction> => {
  const response = await axios.post<{ data: Transaction }>(
    "/transaction",
    data
  );
  return response.data.data;
};

export const updateTransaction = async (
  id: number,
  data: UpdateTransaction
): Promise<Transaction> => {
  const response = await axios.patch<{ data: Transaction }>(
    "/transaction/" + id,
    data
  );
  return response.data.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  const response = await axios.delete("/transaction/" + id);
  return response.data;
};

export const lockTransaction = async (
  id: number,
  data: LockTransaction
): Promise<Transaction> => {
  const response = await axios.patch<{ data: Transaction }>(
    "/transaction-lock/" + id,
    data
  );
  return response.data.data;
};

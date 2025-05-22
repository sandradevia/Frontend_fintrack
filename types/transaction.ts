export interface Transaction {
  id: number;
  amount: number;
  transaction_date: string;
  description: string;
  is_locked: boolean;
  user: {
    id: number;
    name: string;
  };
  branch: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    type: string;
  };
}

export interface UpdateTransaction {
  category_id: number;
  amount: number;
  transaction_date: string;
  description?: string;
}

export interface CreateTransaction {
  user_id: number;
  branch_id: number;
  category_id: number;
  amount: number;
  transaction_date: string;
  description?: string;
}

export interface LockTransaction {
  is_locked: boolean;
}

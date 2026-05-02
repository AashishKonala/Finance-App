import { create } from "zustand";

const API_URL = "http://localhost:5000/api/transactions";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(API_URL);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch transactions");
      }

      set({
        transactions: result.data,
        loading: false,
      });
      console.log("Fetched transactions:", result);
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  addTransaction: async (tx) => {
    try {
      set({ loading: true, error: null });

      const payload = {
        name: tx.name,
        amount: Math.abs(Number(tx.amount)),
        desc: tx.desc,
        category: tx.category,
        type: tx.type,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add transaction");
      }

      set((state) => {
  const alreadyExists = state.transactions.some(
    (t) => t._id === result.data._id
  );

  if (alreadyExists) {
    return {
      loading: false,
    };
  }

  return {
    transactions: [result.data, ...state.transactions],
    loading: false,
  };
});

      return result.data;
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });

      throw error;
    }
  },

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (t) => t._id !== id && t.id !== id
      ),
    })),

  updateTransaction: (updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t._id === updatedTx._id || t.id === updatedTx.id ? updatedTx : t
      ),
    })),

  clearTransactions: () =>
    set({
      transactions: [],
    }),

  getBalance: () =>
    get().transactions.reduce((sum, t) => sum + t.amount, 0),

  getIncome: () =>
    get().transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0),

  getExpense: () =>
    get().transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),
}));
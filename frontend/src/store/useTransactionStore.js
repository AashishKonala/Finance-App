import { create } from "zustand";

export const useTransactionStore = create((set, get) => ({
  transactions: [],

  // 🔹 Set all transactions (initial load / API)
  setTransactions: (data) => set({ transactions: data }),

  // 🔹 Add new transaction
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),

  // 🔹 Delete transaction
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // 🔹 Update transaction
  updateTransaction: (updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTx.id ? updatedTx : t
      ),
    })),

  // 🔥 ===== DERIVED DATA (VERY IMPORTANT) =====

  // 🔹 Total Balance
  getBalance: () =>
    get().transactions.reduce((sum, t) => sum + t.amount, 0),

  // 🔹 Total Income
  getIncome: () =>
    get().transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0),

  // 🔹 Total Expense
  getExpense: () =>
    get().transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),

  // 🔹 Recent Transactions (for dashboard)
  getRecentTransactions: (limit = 5) =>
    [...get().transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit),

  // 🔹 Filter by Category
  getByCategory: (category) =>
    get().transactions.filter((t) => t.category === category),

  // 🔹 Filter by Type (credit/debit)
  getByType: (type) =>
    get().transactions.filter((t) => t.type === type),

  // 🔹 Monthly Expense (basic analytics)
  getMonthlyExpense: () => {
    const monthly = {};

    get().transactions.forEach((t) => {
      if (t.type === "debit") {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
        });

        monthly[month] = (monthly[month] || 0) + Math.abs(t.amount);
      }
    });

    return monthly;
  },
}));

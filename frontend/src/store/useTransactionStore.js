import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALL_TRANSACTIONS } from "../constants/transactionsData";

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (updatedTx) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updatedTx.id ? updatedTx : t
          ),
        })),

      resetTransactions: () =>
        set({
          transactions: ALL_TRANSACTIONS,
        }),

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
    }),
    {
      name: "transactions-storage",

      merge: (persistedState, currentState) => {
        if (!persistedState?.transactions?.length) {
          return {
            ...currentState,
            transactions: ALL_TRANSACTIONS,
          };
        }

        return {
          ...currentState,
          ...persistedState,
        };
      },
    }
  )
);
import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_GOALS = {
  monthlyGoal: {
    achieved: 12500,
    target: 20000,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
  },

  savingSummary: {
    month: "May 2026",
    currentData: [60, 130, 80, 100, 60, 90, 50],
    previousData: [110, 90, 115, 100, 120, 110, 105],
    labels: ["MAY 01", "MAY 10", "MAY 20", "MAY 30"],
  },

  expenseCategories: [
    { id: 1, label: "Housing", amount: 250 },
    { id: 2, label: "Food", amount: 250 },
    { id: 3, label: "Transportation", amount: 250 },
    { id: 4, label: "Entertainment", amount: 250 },
    { id: 5, label: "Shopping", amount: 250 },
    { id: 6, label: "Others", amount: 250 },
  ],
};

export const useGoalStore = create(
  persist(
    (set) => ({
      monthlyGoal: DEFAULT_GOALS.monthlyGoal,
      savingSummary: DEFAULT_GOALS.savingSummary,
      expenseCategories: DEFAULT_GOALS.expenseCategories,

      updateMonthlyGoal: (updatedGoal) =>
        set((state) => ({
          monthlyGoal: {
            ...state.monthlyGoal,
            ...updatedGoal,
          },
        })),

      updateCategoryAmount: (id, amount) =>
        set((state) => ({
          expenseCategories: state.expenseCategories.map((cat) =>
            cat.id === id ? { ...cat, amount } : cat
          ),
        })),

      addCategory: (category) =>
        set((state) => ({
          expenseCategories: [
            ...state.expenseCategories,
            {
              id: Date.now(),
              ...category,
            },
          ],
        })),

      deleteCategory: (id) =>
        set((state) => ({
          expenseCategories: state.expenseCategories.filter(
            (cat) => cat.id !== id
          ),
        })),

      resetGoals: () =>
        set({
          monthlyGoal: DEFAULT_GOALS.monthlyGoal,
          savingSummary: DEFAULT_GOALS.savingSummary,
          expenseCategories: DEFAULT_GOALS.expenseCategories,
        }),
    }),
    {
      name: "goals-storage",
    }
  )
);
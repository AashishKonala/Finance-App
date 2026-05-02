import { create } from "zustand";

const API_URL = "http://localhost:5000/api/goals";

export const useGoalStore = create((set, get) => ({
  monthlyGoal: {
    achieved: 0,
    target: 20000,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
  },

  savingSummary: {
    month: "May 2026",
    currentData: [2500, 4500, 6500, 8500, 10500, 11500, 12500],
    previousData: [1800, 3200, 4700, 5600, 6900, 7600, 8200],
    labels: ["MAY 01", "MAY 05", "MAY 10", "MAY 15", "MAY 20", "MAY 25", "MAY 31"],
  },

  expenseCategories: [],

  loading: false,
  error: null,

  fetchGoals: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(API_URL);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch goals");
      }

      set({
        monthlyGoal: result.data.monthlyGoal,
        savingSummary: result.data.savingSummary,
        expenseCategories: result.data.expenseCategories,
        loading: false,
      });

      console.log("Fetched goals:", result);
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });

      console.error("Fetch goals error:", error.message);
    }
  },

  updateMonthlyGoal: async (updatedGoal) => {
    try {
      set({ loading: true, error: null });

      const currentGoal = get().monthlyGoal;

      const payload = {
        monthlyGoal: {
          ...currentGoal,
          ...updatedGoal,
        },
      };

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update goal");
      }

      set({
        monthlyGoal: result.data.monthlyGoal,
        savingSummary: result.data.savingSummary,
        expenseCategories: result.data.expenseCategories,
        loading: false,
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

  addCategory: async (newCategory) => {
    try {
      set({ loading: true, error: null });

      const currentCategories = get().expenseCategories;

      const updatedCategories = [...currentCategories, newCategory];

      const res = await fetch("http://localhost:5000/api/goals", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseCategories: updatedCategories,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add category");
      }

      set({
        monthlyGoal: result.data.monthlyGoal,
        savingSummary: result.data.savingSummary,
        expenseCategories: result.data.expenseCategories,
        loading: false,
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

  updateCategoryAmount: async (id, amount) => {
    try {
      set({ loading: true, error: null });

      const updatedCategories = get().expenseCategories.map((cat) =>
        cat._id === id || cat.id === id
          ? { ...cat, amount: Number(amount) }
          : cat
      );

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseCategories: updatedCategories,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update category");
      }

      set({
        monthlyGoal: result.data.monthlyGoal,
        savingSummary: result.data.savingSummary,
        expenseCategories: result.data.expenseCategories,
        loading: false,
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

  updateSavingSummary: async (updatedSummary) => {
    try {
      set({ loading: true, error: null });

      const currentSummary = get().savingSummary;

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          savingSummary: {
            ...currentSummary,
            ...updatedSummary,
          },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update saving summary");
      }

      set({
        monthlyGoal: result.data.monthlyGoal,
        savingSummary: result.data.savingSummary,
        expenseCategories: result.data.expenseCategories,
        loading: false,
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

  clearGoals: () =>
    set({
      monthlyGoal: {
        achieved: 0,
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
      expenseCategories: [],
    }),
}));
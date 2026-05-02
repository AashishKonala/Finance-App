import mongoose from "mongoose";

const monthlyGoalSchema = new mongoose.Schema(
  {
    achieved: {
      type: Number,
      default: 0,
      min: 0,
    },

    target: {
      type: Number,
      default: 20000,
      min: 1,
    },

    startDate: {
      type: String,
      default: "2026-05-01",
    },

    endDate: {
      type: String,
      default: "2026-05-31",
    },
  },
  { _id: false }
);

const savingSummarySchema = new mongoose.Schema(
  {
    month: {
      type: String,
      default: "May 2026",
    },

    currentData: {
      type: [Number],
      default: [60, 130, 80, 100, 60, 90, 50],
    },

    previousData: {
      type: [Number],
      default: [110, 90, 115, 100, 120, 110, 105],
    },

    labels: {
      type: [String],
      default: ["MAY 01", "MAY 10", "MAY 20", "MAY 30"],
    },
  },
  { _id: false }
);

const expenseCategorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const goalSchema = new mongoose.Schema(
  {
    monthlyGoal: {
      type: monthlyGoalSchema,
      default: () => ({}),
    },

    savingSummary: {
      type: savingSummarySchema,
      default: () => ({}),
    },

    expenseCategories: {
      type: [expenseCategorySchema],
      default: [
        { label: "Housing", amount: 250 },
        { label: "Food", amount: 250 },
        { label: "Transportation", amount: 250 },
        { label: "Entertainment", amount: 250 },
        { label: "Shopping", amount: 250 },
        { label: "Others", amount: 250 },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
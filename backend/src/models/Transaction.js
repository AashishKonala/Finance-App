import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    desc: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
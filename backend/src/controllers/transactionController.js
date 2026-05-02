import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { name, amount, desc, category, type } = req.body;

    if (!name || amount === undefined || !category || !type) {
      return res.status(400).json({
        success: false,
        message: "Name, amount, category, and type are required",
      });
    }

    if (!["debit", "credit"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either debit or credit",
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const finalAmount =
      type === "debit" ? -Math.abs(numericAmount) : Math.abs(numericAmount);

    const transaction = await Transaction.create({
      name,
      amount: finalAmount,
      desc,
      category,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};
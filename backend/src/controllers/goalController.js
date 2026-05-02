import Goal from "../models/Goal.js";

export const getGoals = async (req, res) => {
  try {
    let goal = await Goal.findOne();

    // First time: create default goal document
    if (!goal) {
      goal = await Goal.create({});
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch goals",
      error: error.message,
    });
  }
};

export const updateGoals = async (req, res) => {
  try {
    const { monthlyGoal, savingSummary, expenseCategories } = req.body;

    let goal = await Goal.findOne();

    // First time: create if missing
    if (!goal) {
      goal = await Goal.create({});
    }

    if (monthlyGoal) {
      goal.monthlyGoal = {
        ...goal.monthlyGoal.toObject(),
        ...monthlyGoal,
      };
    }

    if (savingSummary) {
      goal.savingSummary = {
        ...goal.savingSummary.toObject(),
        ...savingSummary,
      };
    }

    if (expenseCategories) {
      goal.expenseCategories = expenseCategories;
    }

    const updatedGoal = await goal.save();

    res.status(200).json({
      success: true,
      message: "Goals updated successfully",
      data: updatedGoal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update goals",
      error: error.message,
    });
  }
};
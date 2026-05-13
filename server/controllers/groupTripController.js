import GroupTrip from "../models/GroupTrip.js";

export const createGroupTrip = async (req, res) => {
  try {
    const { title, members } = req.body;

    const groupTrip = await GroupTrip.create({
      title,
      members,
    });

    res.status(201).json(groupTrip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { title, amount, paidBy } = req.body;

    const groupTrip = await GroupTrip.findById(req.params.id);

    if (!groupTrip) {
      return res.status(404).json({
        message: "Group trip not found",
      });
    }

    groupTrip.expenses.push({
      title,
      amount,
      paidBy,
    });

    await groupTrip.save();

    res.status(200).json({
      message: "Expense added",
      groupTrip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const calculateSplit = async (req, res) => {
  try {
    const groupTrip = await GroupTrip.findById(req.params.id).populate(
      "members",
      "name",
    );

    if (!groupTrip) {
      return res.status(404).json({
        message: "Group trip not found",
      });
    }

    const totalExpense = groupTrip.expenses.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    const splitAmount = totalExpense / groupTrip.members.length;

    res.status(200).json({
      totalExpense,
      splitAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

import express from "express";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Get all Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: transactions });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

router.get('/top-up', async (req, res) => {
  try {
    const transactions = await Transaction.find({ type: 'top-up' }).sort({ createdAt: -1 });
    res.json(transactions); // Ensure this is a valid JSON response
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top-up transactions',
      error: error.message,
    });
  }
});

router.get("/monthly-summary", async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlySummary = await Transaction.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: monthlySummary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});


// Create a new Payment Transaction
router.post(
  "/payment",
  [
    body("cardID").notEmpty().withMessage("cardID is required"),
    body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "Validation error", errors: errors.array() });
    }

    const { cardID, amount } = req.body;

    try {
      const user = await User.findOne({ cardID });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found for this cardID" });
      }

      if (user.balance < amount) {
        return res.status(400).json({ success: false, message: "Insufficient balance" });
      }

      user.balance -= amount;
      await user.save();

      const transaction = new Transaction({
        userID: user._id,
        cardID,
        type: "payment",
        amount,
        balance: user.balance,
      });

      const newTransaction = await transaction.save();
      return res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  }
);

// Create a new Top-Up Transaction
router.post(
  "/top-up",
  [
    body("cardID").notEmpty().withMessage("cardID is required"),
    body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "Validation error", errors: errors.array() });
    }

    const { cardID, amount } = req.body;

    try {
      const user = await User.findOne({ cardID });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found for this cardID" });
      }

      user.balance += amount;
      await user.save();

      const transaction = new Transaction({
        userID: user._id,
        cardID,
        type: "top-up",
        amount,
        balance: user.balance,
      });

      const newTransaction = await transaction.save();
      return res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  }
);

// Update a Transaction
router.put("/:id", async (req, res) => {
  const { amount, type } = req.body;

  if (amount !== undefined && amount < 0) {
    return res.status(400).json({ success: false, message: "Amount must be a positive number" });
  }

  if (type && !["payment", "top-up"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid transaction type" });
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    return res.json({ success: true, data: updatedTransaction });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Delete a Transaction
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    return res.json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;

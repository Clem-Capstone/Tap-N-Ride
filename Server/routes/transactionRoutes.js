import express from "express";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js"; // Assuming you have a User model
import { body, validationResult } from "express-validator";

const router = express.Router();

// Get all Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: transactions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Create a new Transaction
router.post(
  "/",
  [
    body("cardID").notEmpty().withMessage("cardID is required"),
    body("paymentAmount").isFloat({ min: 0 }).withMessage("paymentAmount must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "Validation error", errors: errors.array() });
    }

    const { cardID, paymentAmount } = req.body;

    try {
      // Find user by cardID
      const user = await User.findOne({ cardID });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found for this cardID" });
      } 

      // Check if the user has sufficient balance
      if (user.balance < paymentAmount) {
        return res.status(400).json({ success: false, message: "Insufficient balance" });
      }

      // Deduct the paymentAmount from the balance
      user.balance -= paymentAmount;

      // Save the updated user balance
      await user.save();

      // Check against duplicate transactions within a short time window
      const lastTransaction = await Transaction.findOne({ cardID }).sort({ createdAt: -1 });
      if (lastTransaction) {
        const oneMinuteAgo = new Date(Date.now() - 60000);
        if (lastTransaction.createdAt > oneMinuteAgo) {
          return res.status(400).json({ success: false, message: "Transaction too soon" });
        }
      }

      // Create the transaction
      const transaction = new Transaction({
        userID: user._id,
        cardID,
        balance: user.balance,
        paymentAmount,
      });

      const newTransaction = await transaction.save();
      return res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
);

// Update a Transaction
router.put("/:id", async (req, res) => {
  const { balance, paymentAmount } = req.body;

  // Validate balance and paymentAmount to ensure they're positive
  if (balance !== undefined && balance < 0) {
    return res.status(400).json({ success: false, message: "Balance must be a positive number" });
  }
  if (paymentAmount !== undefined && paymentAmount < 0) {
    return res.status(400).json({ success: false, message: "Payment amount must be a positive number" });
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensure validators are run on update
    );
    if (!updatedTransaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    return res.json({ success: true, data: updatedTransaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
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
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;

import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get all Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Create a new Transaction
router.post("/", async (req, res) => {
  if (
    req.body.userID == undefined ||
    req.body.cardID == undefined ||
    req.body.balance == undefined ||
    req.body.paymentAmount == undefined
  ) {
    return res.status(400).json({ message: "missing required fields" });
  }
  const { userID, cardID, balance, paymentAmount } = req.body;
  try {
    //check against duplicate transactions
    const lastTransaction = await Transaction.findOne({ cardID }).sort({
      createdAt: -1,
    });

    if (lastTransaction) {
      const oneMinuteAgo = new Date(Date.now() - 60000);
      if (lastTransaction.createdAt > oneMinuteAgo) {
        return res.status(400).json({ message: "Transaction too soon" });
      }
    }

    const transaction = new Transaction({
      userID,
      cardID,
      balance,
      paymentAmount,
    });
    const newTransaction = await transaction.save();
    return res.status(201).json(newTransaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a Transaction
router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(updatedTransaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete a Transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    return res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

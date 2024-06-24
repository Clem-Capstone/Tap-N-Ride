import express from 'express'
import Transaction from '../models/Transaction.js'

const router = express.Router()

// Get all Transactions
router.get('/', async (req, res) => {
  try {
    const Transactions = await Transaction.find()
    res.json(Transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new Transaction
router.post('/', async (req, res) => {
  const Transaction = new Transaction({
    userID: req.userID,
    cardID: req.cardID,
    balance: req.balance,
    amount: req.amount,
  })

  try {
    const newTransaction = await Transaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    cardID: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction

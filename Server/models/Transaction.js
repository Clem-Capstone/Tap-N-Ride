import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // Assuming you have a User model
      ref: 'User',
      required: true,
    },
    cardID: {
      type: String,
      required: true,
      index: true, // Adds an index to the cardID field
    },
    balance: {
      type: Number,
      required: true,
      min: 0, // Ensures the balance is non-negative
      default: 0, // Default value of balance
    },
    paymentAmount: {
      type: Number,
      required: true,
      min: 0, // Ensures payment amount is non-negative
      default: 15, // Default value of paymentAmount
    },
  },
  { timestamps: true }
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction

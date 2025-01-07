// Updated Transaction Model
import mongoose from 'mongoose';

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
    type: {
      type: String,
      enum: ['payment', 'top-up'], // Transaction type
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensures the amount is non-negative
    },
    balance: {
      type: Number,
      min: 0, // Ensures the balance is non-negative
      default: 0, // Default value of balance for top-ups
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;

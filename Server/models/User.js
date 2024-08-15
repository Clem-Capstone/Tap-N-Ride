import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  middleName: {
    type: String,
    required: false, // Middlename might be optional
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  cardID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[A-Fa-f0-9]{8,32}$/, // Example pattern for a hexadecimal cardID (adjust as needed)
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0, // Ensure balance is non-negative
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Check if the model is already compiled, otherwise compile it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  cardID: { type: String, required: true, unique: true, trim: true },
  balance: { type: Number, required: true, default: 0, min: 0 },
  isTappedIn: { type: Boolean, default: false },
  lastTapInPoint: { type: String, default: null },
  lastTapInTime: { type: Date, default: null },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

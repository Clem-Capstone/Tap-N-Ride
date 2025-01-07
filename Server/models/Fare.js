import mongoose from "mongoose";

const FareSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true, // Ensures the route field is mandatory
  },
  accommodation: {
    type: String,
    enum: ["Aircon", "Non-aircon"], // Restrict to specific values
    required: true,
  },
  fullMin: {
    type: Number,
    required: true, // Ensure fullMin is mandatory
  },
  fullPerKM: {
    type: Number,
    required: true, // Ensure fullPerKM is mandatory
  },
  spMin: {
    type: Number,
    default: 0, // Optional field, defaults to 0
  },
  spPerKM: {
    type: Number,
    default: 0, // Optional field, defaults to 0
  },
  promoPerKM: {
    type: Number,
    default: 0, // Optional field, defaults to 0
  },
  dateTimeAdded: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

export default mongoose.model("Fare", FareSchema);

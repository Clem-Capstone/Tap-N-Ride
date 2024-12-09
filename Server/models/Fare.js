import mongoose from "mongoose";

const fareSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: Number, required: true },
});

const Fare = mongoose.model("Fare", fareSchema);

export default Fare;

// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    busNumber: { type: String, required: true },
    driver: { type: String, required: true },
    conductor: { type: String, required: true },
    passenger: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;

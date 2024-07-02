import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
    },
    driver: {
      type: String,
      required: true,
    },
    conductor: {
      type: String,
      required: true,
    },
    passengerFrom: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;

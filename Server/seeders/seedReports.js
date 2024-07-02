import mongoose from "mongoose";
import dotenv from "dotenv";
import createReport from "../factories/reportFactory.js";
import Report from "../models/Report.js";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedReports = async () => {
  try {
    await Report.deleteMany(); // Clear existing data

    const reports = [];

    for (let i = 0; i < 10; i++) {
      const report = createReport();
      reports.push(report);
    }

    await Report.insertMany(reports);
    console.log("Reports seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding reports failed:", error);
    mongoose.connection.close();
  }
};

seedReports();

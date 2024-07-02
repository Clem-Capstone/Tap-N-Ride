// reportRoutes.js
import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// Get all Reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    return res.json(reports);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Create a new Report
router.post("/", async (req, res) => {
  const { busNumber, driver, conductor, passengerFrom, from, to, km } =
    req.body;

  if (
    !busNumber ||
    !driver ||
    !conductor ||
    !passengerFrom ||
    !from ||
    !to ||
    !km
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const report = new Report({
      busNumber,
      driver,
      conductor,
      passengerFrom,
      from,
      to,
      km,
    });
    const newReport = await report.save();
    return res.status(201).json(newReport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

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
  const { busNumber, driver, conductor, passengerFrom, from, to } = req.body;

  try {
    const report = new Report({
      busNumber,
      driver,
      conductor,
      passengerFrom,
      from,
      to,
    });

    const newReport = await report.save();
    return res.status(201).json(newReport);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Update a Report
router.put("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const { busNumber, driver, conductor, passengerFrom, from, to } = req.body;
    if (busNumber) report.busNumber = busNumber;
    if (driver) report.driver = driver;
    if (conductor) report.conductor = conductor;
    if (passengerFrom) report.passengerFrom = passengerFrom;
    if (from) report.from = from;
    if (to) report.to = to;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Report
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.remove();
    res.json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// reportRoutes.js
import express from "express";
import Report from "../models/Report.js";
import User from "../models/User.js"; // Make sure to import the User model

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

// Get Reports for a specific user
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find reports associated with this user
    const reports = await Report.find({ passengerFrom: user._id });

    // Combine report data with user data
    const combinedReports = reports.map((report) => ({
      ...report.toObject(),
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      cardID: user.cardID,
      balance: user.balance,
    }));

    return res.json(combinedReports);
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

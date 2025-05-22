import express from "express";
import Fare from "../models/Fare.js";

const router = express.Router();

// GET: Fetch all fares
router.get("/", async (req, res) => {
  try {
    const fares = await Fare.find();
    res.json(fares);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fares", error });
  }
});

// POST: Create a new fare
router.post("/", async (req, res) => {
  const {
    route,
    accommodation,
    fullMin,
    fullPerKM,
    spMin,
    spPerKM,
    promoPerKM,
  } = req.body;

  // Validate required fields
  if (!route || !accommodation || !fullMin || !fullPerKM) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newFare = new Fare({
      route,
      accommodation,
      fullMin,
      fullPerKM,
      spMin,
      spPerKM,
      promoPerKM,
    });
    await newFare.save();
    res.status(201).json(newFare);
  } catch (error) {
    res.status(400).json({ message: "Error creating fare", error });
  }
});

// PUT: Update an existing fare
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    route,
    accommodation,
    fullMin,
    fullPerKM,
    spMin,
    spPerKM,
    promoPerKM,
  } = req.body;

  // Validate required fields
  if (!route || !accommodation || !fullMin || !fullPerKM) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      {
        route,
        accommodation,
        fullMin,
        fullPerKM,
        spMin,
        spPerKM,
        promoPerKM,
      },
      { new: true }
    );

    if (!updatedFare) {
      return res.status(404).json({ message: "Fare not found" });
    }

    res.json(updatedFare);
  } catch (error) {
    res.status(400).json({ message: "Error updating fare", error });
  }
});

// DELETE: Remove a fare
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFare = await Fare.findByIdAndDelete(id);

    if (!deletedFare) {
      return res.status(404).json({ message: "Fare not found" });
    }

    res.json({ message: "Fare deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fare", error });
  }
});

export default router;

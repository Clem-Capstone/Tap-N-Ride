import express from "express";
import Fare from "../models/Fare.js";

const router = express.Router();

// GET: Fetch all fares
router.get("/", async (req, res) => {
  try {
    const fares = await Fare.find();
    res.json(fares);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fares" });
  }
});

// POST: Create a new fare
router.post("/", async (req, res) => {
  const { from, to, fare } = req.body;
  try {
    const newFare = new Fare({ from, to, fare });
    await newFare.save();
    res.status(201).json(newFare);
  } catch (error) {
    res.status(400).json({ message: "Error creating fare" });
  }
});

// PUT: Update an existing fare
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { from, to, fare } = req.body;
  try {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { from, to, fare },
      { new: true }
    );
    if (!updatedFare) return res.status(404).json({ message: "Fare not found" });
    res.json(updatedFare);
  } catch (error) {
    res.status(400).json({ message: "Error updating fare" });
  }
});

// DELETE: Remove a fare
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFare = await Fare.findByIdAndDelete(id);
    if (!deletedFare) return res.status(404).json({ message: "Fare not found" });
    res.json({ message: "Fare deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fare" });
  }
});

export default router;

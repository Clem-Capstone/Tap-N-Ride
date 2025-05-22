import express from 'express';
import Bus from '../models/Bus.js'; // Import the Bus model

const router = express.Router();

// GET /api/buses - Fetch all buses with populated route names
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeID', 'name'); // Populate route name
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buses', details: error.message });
  }
});

// Count Active Buses
router.get("/active", async (req, res) => {
  try {
    const activeBuses = await Bus.countDocuments({ status: "active" });
    res.status(200).json({ activeBuses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active buses count", details: error.message });
  }
});

// POST /api/buses - Add a new bus
router.post('/', async (req, res) => {
  const { busID, routeID, status, area } = req.body;

  // Normalize status to lowercase
  const normalizedStatus = status?.toLowerCase();

  if (!busID || !routeID || !normalizedStatus || !area) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newBus = new Bus({
      busID,
      routeID,
      status: normalizedStatus,
      area,
    });

    const savedBus = await newBus.save();
    const populatedBus = await Bus.findById(savedBus._id).populate('routeID', 'name'); // Populate route name for immediate response
    res.status(201).json(populatedBus);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add bus', details: error.message });
  }
});

// PUT /api/buses/:id - Update a bus
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Normalize status to lowercase if it's being updated
  if (updates.status) {
    updates.status = updates.status.toLowerCase();
  }

  try {
    const updatedBus = await Bus.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('routeID', 'name'); // Populate route name
    if (!updatedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update bus', details: error.message });
  }
});

// DELETE /api/buses/:id - Delete a bus
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete bus with ID: ${id}`); // Log the ID being deleted
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bus', details: error.message });
  }
});

export default router;

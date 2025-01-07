import express from 'express';
import Route from '../models/Route.js';

const router = express.Router();

// Fetch all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    // Add an index field starting from 1
    const indexedRoutes = routes.map((route, index) => ({
      ...route._doc, // Extract the raw document data
      id: route._id, // Map MongoDB _id to `id`
      index: index + 1, // Add custom index for display
    }));
    res.json(indexedRoutes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routes', error });
  }
});

// Add a new route
router.post('/', async (req, res) => {
  try {
    const { abbreviation, name, branchStation } = req.body;
    if (!abbreviation || !name || !branchStation) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRoute = new Route({ abbreviation, name, branchStation });
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error saving route', error });
  }
});

// Edit an existing route
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { abbreviation, name, branchStation } = req.body;

    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      { abbreviation, name, branchStation },
      { new: true }
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error updating route', error });
  }
});

// Toggle the state of a route (Open/Close)
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    route.isOpen = !route.isOpen;
    await route.save();

    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling route state', error });
  }
});

// Delete a route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Route.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.json({ message: 'Route deleted successfully', deletedRoute });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting route', error });
  }
});

export default router;

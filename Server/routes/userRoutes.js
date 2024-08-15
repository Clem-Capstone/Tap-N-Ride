import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { lastName, firstName, middleName, cardID, balance } = req.body;

  if (!lastName || !firstName || !cardID) {
    return res.status(400).json({ message: 'Last name, first name, and card ID are required.' });
  }

  const user = new User({
    lastName,
    firstName,
    middleName,
    cardID,
    balance: balance || 0, // Default balance to 0 if not provided
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;

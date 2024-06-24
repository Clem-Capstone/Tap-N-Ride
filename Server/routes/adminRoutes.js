import express from 'express';
import Admin from '../models/Admin.js';

const router = express.Router();

// Route to get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');  // Securely exclude password
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);  // Log error for server diagnostics
    res.status(500).send('Server Error');
  }
});

export default router;

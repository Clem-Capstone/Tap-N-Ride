import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminAuthController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Example of a protected route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.admin.username}` });
});

export default router;

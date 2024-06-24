import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminAuthController.js';
import { getAdmins, deleteAdmin, updateAdmin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes for admin management
router.use(authMiddleware); // Apply middleware to protect these routes
router.get('/admins', getAdmins);
router.delete('/admins/:id', deleteAdmin);
router.put('/admins/:id', updateAdmin);

export default router;

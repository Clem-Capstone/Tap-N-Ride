import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminAuthController.js';
import { getAdmins, updateAdmin, deleteAdmin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes for admin management
router.use(authMiddleware);
router.get('/admins', getAdmins);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;

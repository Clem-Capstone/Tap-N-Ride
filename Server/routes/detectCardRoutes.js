import express from 'express';
import { detectCard } from '../controllers/userController.js';

const router = express.Router();

router.get('/', detectCard);

// POST route to handle card detection
router.post('/', detectCard);

export default router;



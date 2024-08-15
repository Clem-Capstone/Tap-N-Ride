import express from 'express';
import { tapIn } from '../controllers/tapInController.js';

const router = express.Router();

router.post('/', tapIn);

export default router;

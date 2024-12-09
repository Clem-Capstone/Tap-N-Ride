import express from 'express';
import { tapOut } from '../controllers/tapOutController.js';

const router = express.Router();

router.post('/', tapOut);

export default router;

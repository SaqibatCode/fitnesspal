import express from 'express';
import { exportData } from '../controllers/exportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:type', protect, exportData);

export default router;

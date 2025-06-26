import express from 'express';
import { addProgress, getProgress, updateProgress, deleteProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addProgress);
router.get('/', protect, getProgress);
router.put('/:id', protect, updateProgress);
router.delete('/:id', protect, deleteProgress);

export default router;

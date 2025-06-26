import express from 'express';
import { logNutrition, getNutrition, deleteNutrition } from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, logNutrition);
router.get('/', protect, getNutrition);
router.delete('/:id', protect, deleteNutrition);

export default router;

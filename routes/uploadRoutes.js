import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const upload = multer({ storage });

const router = express.Router();

router.post('/profile-pic', protect, upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

export default router;

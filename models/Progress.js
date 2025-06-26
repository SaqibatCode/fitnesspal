import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: Number, // kg
  bodyFat: Number, // %
  waist: Number, // cm
  chest: Number, // cm
  performance: String // e.g. "5km run in 30min"
});

export default mongoose.model('Progress', progressSchema);

import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['workout', 'meal', 'progress', 'custom'],
    required: true
  },
  time: { type: String, required: true }, // Format: HH:mm
  date: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Reminder', reminderSchema);

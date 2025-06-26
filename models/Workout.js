import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['cardio', 'strength', 'flexibility', 'other'], required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
      notes: String,
    }
  ]
});

export default mongoose.model('Workout', workoutSchema);

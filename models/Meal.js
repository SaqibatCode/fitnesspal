import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
    required: true
  },
  foodItems: [
    {
      name: String,
      quantity: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number
    }
  ]
});

export default mongoose.model('Meal', mealSchema);

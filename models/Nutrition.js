import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  meals: [
    {
      mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
      foodItems: [
        {
          name: String,
          calories: Number,
          protein: Number,
          carbs: Number,
          fat: Number
        }
      ]
    }
  ]
});

export default mongoose.model('Nutrition', nutritionSchema);

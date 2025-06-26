import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';
import Progress from '../models/Progress.js';

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch latest 3 workouts
    const workouts = await Workout.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    // Fetch latest 3 meals
    const meals = await Meal.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    // Fetch latest 3 progress logs
    const progressLogs = await Progress.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    // Calculate total calories for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayMeals = await Meal.find({
      userId,
      date: { $gte: startOfDay },
    });

    let totalCalories = 0;
    todayMeals.forEach((meal) => {
      meal.foodItems.forEach((item) => {
        totalCalories += item.calories;
      });
    });

    // Get latest weight (from most recent progress entry)
    const latestProgress = await Progress.findOne({ userId })
      .sort({ date: -1 });

    const latestWeight = latestProgress?.weight || null;

    res.json({
      workouts,
      meals,
      progressLogs,
      totalCaloriesToday: totalCalories,
      latestWeight,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};

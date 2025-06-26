import Meal from '../models/Meal.js';

export const addMeal = async (req, res) => {
  try {
    const meal = await Meal.create({ ...req.body, userId: req.user.id });
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ error: 'Meal creation failed' });
  }
};

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMeal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update meal' });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete meal' });
  }
};

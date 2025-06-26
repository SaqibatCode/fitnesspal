import Nutrition from '../models/Nutrition.js';

export const logNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.create({ ...req.body, userId: req.user.id });
    res.status(201).json(nutrition);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log nutrition' });
  }
};

export const getNutrition = async (req, res) => {
  try {
    const nutritionLogs = await Nutrition.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(nutritionLogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nutrition logs' });
  }
};

export const deleteNutrition = async (req, res) => {
  try {
    await Nutrition.findByIdAndDelete(req.params.id);
    res.json({ message: 'Nutrition entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete nutrition entry' });
  }
};

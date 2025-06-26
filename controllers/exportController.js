import { Parser } from 'json2csv';
import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';
import Progress from '../models/Progress.js';

export const exportData = async (req, res) => {
  const { type } = req.params;
  const userId = req.user.id;

  try {
    let data = [];
    let fileName = `${type}.csv`;

    switch (type) {
      case 'workouts':
        data = await Workout.find({ userId });
        break;
      case 'meals':
        data = await Meal.find({ userId });
        break;
      case 'progress':
        data = await Progress.find({ userId });
        break;
      default:
        return res.status(400).json({ error: 'Invalid export type' });
    }

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export data' });
  }
};

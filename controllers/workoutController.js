import Workout from '../models/Workout.js';

export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, userId: req.user.id });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Workout creation failed' });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};


export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });

    res.json(updatedWorkout);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

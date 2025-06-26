import Progress from '../models/Progress.js';

export const addProgress = async (req, res) => {
  try {
    const progress = await Progress.create({ ...req.body, userId: req.user.id });
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add progress' });
  }
};

export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: 'Progress deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete progress' });
  }
};

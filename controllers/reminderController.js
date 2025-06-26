import Reminder from '../models/Reminder.js';

export const addReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({ ...req.body, userId: req.user.id });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reminder' });
  }
};

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).sort({ date: 1, time: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update reminder' });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
};

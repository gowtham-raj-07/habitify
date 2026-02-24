import Habit from "../models/habit.js";

export const createHabit = async (req, res) => {
  const habit = await Habit.create({
    user: req.user.id,
    task: req.body.task,
    goal: req.body.goal,
    frequency: req.body.frequency,
    records: {},
  });

  res.status(201).json(habit);
};

export const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(habits);
};

export const updateHabit = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    {
      task: req.body.task,
      goal: req.body.goal,
      frequency: req.body.frequency,
    },
    { new: true }
  );

  res.json(habit);
};

export const deleteHabit = async (req, res) => {
  await Habit.deleteOne({
    _id: req.params.id,
    user: req.user.id,
  });

  res.json({ success: true });
};

export const toggleRecord = async (req, res) => {
  const { dateKey, value } = req.body;

  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    {
      $set: { [`records.${dateKey}`]: value },
    },
    { new: true }
  );

  res.json(habit);
};

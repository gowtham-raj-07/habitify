import Habit from "../models/habit.js";
import Sleep from "../models/sleep.js";
import Note from "../models/note.js";
import User from "../models/user.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const habits = await Habit.find({ user: req.user.id }).lean();
  const sleeps = await Sleep.find({ user: req.user.id }).lean();
  const notes = await Note.find({ user: req.user.id }).lean();

  let habitCompleted = 0;
  let habitMissed = 0;

  habits.forEach((h) => {
    Object.values(h.records || {}).forEach((v) => {
      if (v === true) habitCompleted++;
      if (v === false) habitMissed++;
    });
  });

  const sleepValues = [];

  sleeps.forEach((m) => {
    Object.values(m.records || {}).forEach(({ hours, minutes }) => {
      sleepValues.push(hours + minutes / 60);
    });
  });

  const totalSleep =
    sleepValues.reduce((a, b) => a + b, 0) || 0;

  const average =
    sleepValues.length === 0 ? 0 : totalSleep / sleepValues.length;

  const best =
    sleepValues.length === 0 ? 0 : Math.max(...sleepValues);

  const worst =
    sleepValues.length === 0 ? 0 : Math.min(...sleepValues);

  const consistency =
    sleepValues.length === 0 ? 0 : best - worst;

  const goalMet =
    sleepValues.filter((v) => v >= 8).length;

  const noteWeight = notes.reduce(
    (a, n) => a + n.title.trim().length + n.content.trim().length,
    0
  );

  res.json({
    user,
    habits: { completed: habitCompleted, missed: habitMissed },
    sleep: {
      average: Number(average.toFixed(2)),
      best: Number(best.toFixed(2)),
      worst: Number(worst.toFixed(2)),
      consistency: Number(consistency.toFixed(2)),
      goalMet,
    },
    notes: { totalWeight: noteWeight, count: notes.length },
  });
};

export const updateAvatar = async (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).json({ message: "Avatar required" });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar },
    { new: true }
  ).select("-password");

  res.json(user);
};
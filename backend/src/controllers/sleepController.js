import Sleep from "../models/sleep.js";

export const getSleepByMonth = async (req, res) => {
  const sleep = await Sleep.findOne({
    user: req.user.id,
    month: req.params.month,
  });

  if (!sleep) {
    return res.json({ records: {} });
  }

  res.json({ records: sleep.records });
};

export const upsertSleepEntry = async (req, res) => {
  const { day, hours, minutes } = req.body;

  const sleep = await Sleep.findOneAndUpdate(
    {
      user: req.user.id,
      month: req.params.month,
    },
    {
      $set: {
        [`records.${day}`]: {
          hours,
          minutes,
        },
      },
    },
    { upsert: true, new: true }
  );

  res.json({ records: sleep.records });
};

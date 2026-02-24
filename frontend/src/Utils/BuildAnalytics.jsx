export default function buildAnalyticsData(habits, dates) {
  const byDate = {};
  const byHabit = {};
  let completed = 0;
  let missed = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayName = (d) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

  dates.forEach((d) => {
    const key = d.toISOString().split("T")[0];
    byDate[key] = { completed: 0 };
  });

  habits.forEach((h) => {
    let c = 0;
    let m = 0;

    const created = new Date(h.createdAt);
    created.setHours(0, 0, 0, 0);

    dates.forEach((d) => {
      const current = new Date(d);
      current.setHours(0, 0, 0, 0);

      const allowed =
        current >= created &&
        current <= today &&
        h.frequency?.includes(dayName(current));

      if (!allowed) return;

      const key = current.toISOString().split("T")[0];
      const value = h.records?.[key];

      if (value === true) {
        c++;
        completed++;
        byDate[key].completed++;
      } else {
        m++;
        missed++;
      }
    });

    byHabit[h.task] = { completed: c, missed: m };
  });

  return { byDate, byHabit, overall: { completed, missed } };
}
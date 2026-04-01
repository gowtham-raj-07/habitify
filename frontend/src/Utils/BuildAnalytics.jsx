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
    let allTimeCompleted = 0;
    let allTimeMissed = 0;

    const created = new Date(h.createdAt);
    created.setHours(0, 0, 0, 0);

    // 1. Calculate By Date (Month specific for Bar Chart)
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
        byDate[key].completed++;
      }
    });

    // 2. Calculate All-Time for Pie Charts & Summaries
    for (let d = new Date(created); d <= today; d.setDate(d.getDate() + 1)) {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);

      if (h.frequency?.includes(dayName(copy))) {
        const key = copy.toISOString().split("T")[0];
        if (h.records?.[key] === true) {
          allTimeCompleted++;
          completed++;
        } else {
          allTimeMissed++;
          missed++;
        }
      }
    }

    byHabit[h.task] = { completed: allTimeCompleted, missed: allTimeMissed };
  });

  return { byDate, byHabit, overall: { completed, missed } };
}
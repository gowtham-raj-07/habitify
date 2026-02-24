export const calculateTotalSleep = (hours = 0, minutes = 0) => {
  return +(Number(hours) + Number(minutes) / 60).toFixed(2);
};

export const buildSleepStats = (sleepData = {}) => {
  const values = Object.values(sleepData).map(
    ({ hours = 0, minutes = 0 }) =>
      calculateTotalSleep(hours, minutes)
  );

  if (values.length === 0) {
    return {
      average: 0,
      best: 0,
      worst: 0,
      consistency: 0,
      goalMet: 0,
    };
  }

  const total = values.reduce((a, b) => a + b, 0);
  const average = +(total / values.length).toFixed(2);
  const best = Math.max(...values);
  const worst = Math.min(...values);
  const consistency = +(best - worst).toFixed(2);
  const goalMet = values.filter((v) => v >= 8).length;

  return {
    average,
    best,
    worst,
    consistency,
    goalMet,
  };
};

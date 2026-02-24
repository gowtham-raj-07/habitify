export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const formatMonthKey = (year, month) => {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
};

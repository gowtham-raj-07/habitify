import API from "./Axios";


export const fetchHabits = () => API.get("/habits");

export const createHabit = (data) =>
  API.post("/habits", data);

export const updateHabit = (id, data) =>
  API.put(`/habits/${id}`, data);

export const deleteHabit = (id) =>
  API.delete(`/habits/${id}`);

export const toggleHabitRecord = (id, dateKey, value) =>
  API.patch(`/habits/${id}/record`, {
    dateKey,
    value,
  });

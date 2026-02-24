import API from "./Axios";

export const fetchSleepByMonth = (month) =>
  API.get(`/sleep/${month}`);

export const saveSleepEntry = (month, payload) =>
  API.post(`/sleep/${month}`, payload);

import API from "./Axios";

export const fetchProfile = () => API.get("/user/profile");

export const updateAvatar = (avatar) =>
  API.patch("/user/avatar", { avatar });
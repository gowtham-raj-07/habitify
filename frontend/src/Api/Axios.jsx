import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://habitify-gkcp.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    const token = Cookies.get("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;

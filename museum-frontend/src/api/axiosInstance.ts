import axios from "axios";
import { history } from "../navigate";

const axiosInstance = axios.create({
  baseURL: "https://playground.zenberry.one",
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      localStorage.removeItem("token");
      history.push("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

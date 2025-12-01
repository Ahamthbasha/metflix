import axios from "axios";
import { getUserId } from "../utils/userId";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

API.interceptors.request.use(
  (config) => {
    const userId = getUserId();
    config.headers['X-User-ID'] = userId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
import axios from "axios";

const api = axios.create({
  baseURL: "https://family-health-app-yxcu.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("auth-storage") || "").state
    .token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

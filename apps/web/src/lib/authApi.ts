import axios from "axios";

const authApi = axios.create({
  baseURL: `https://family-health-app-yxcu.onrender.com/api/auth`,
});

export default authApi;

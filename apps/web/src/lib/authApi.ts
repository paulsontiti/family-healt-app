import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_API_URL}/auth`,
});

export default authApi;

import axios from "axios";

const api = axios.create({
 // baseURL: "http://localhost:5000/api",
  baseURL: "https://storeratings-production.up.railway.app/api",
  withCredentials: true,
});

export default api;

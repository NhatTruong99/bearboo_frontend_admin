import axios from "axios";

const instance = axios.create({
  baseURL: "https://bearboobackend-production.up.railway.app/api",
  // baseURL: "http://localhost:8900/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
export default instance;

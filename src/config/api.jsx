import axios from "axios";

const apiRoutes = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiRoutes };

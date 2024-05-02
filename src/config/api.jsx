import axios from "axios";

const apiRoutes = axios.create({
  withCredentials: false,
  baseURL: "https://elkindy-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiRoutes };

import axios from "axios";

const apiRoutes = axios.create({
    withCredentials: true,
    baseURL: "https://elkindy-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export { apiRoutes };
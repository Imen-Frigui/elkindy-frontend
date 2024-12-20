import axios from "axios";

const apiRoutes = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export { apiRoutes };
import axios from "axios";

const API = axios.create({
    baseURL: "https://club-event-management.onrender.com/api", 
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;

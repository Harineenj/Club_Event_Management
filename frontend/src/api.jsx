import axios from "axios";

const API = axios.create({
    baseURL: "https://club-event-management.onrender.com", 
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;

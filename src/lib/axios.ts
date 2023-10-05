import axios from "axios";
const BASED_URL = import.meta.env.BASED_URL || "http://localhost:3000/api";
const axiosClient = axios.create({
    baseURL: BASED_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const authAxiosClient = axios.create({
    baseURL: BASED_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

function addAuth(token: string) {
    console.log("Adding auth token: " + token);
}

export { addAuth, authAxiosClient, axiosClient };

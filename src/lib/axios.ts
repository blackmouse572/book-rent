import axios from "axios";
const BASED_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";
console.log("Configure axios with base url: " + BASED_URL);
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

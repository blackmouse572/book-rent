import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const authAxiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

function addAuth(token: string) {
    authAxiosClient.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;
}

export { addAuth, authAxiosClient, axiosClient };

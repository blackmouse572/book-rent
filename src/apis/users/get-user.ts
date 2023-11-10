import { authAxiosClient } from "../../lib/axios";

export async function getUserApi(
    userId: string,
) {
    return authAxiosClient
        .get(`/user/get/${userId}`)
        .then((res) => res.data);
}

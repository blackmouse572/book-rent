import { authAxiosClient } from "../../lib/axios";

export async function postUnbanUserApi(
    userId: string,
) {
    return authAxiosClient
        .post(`/user/unban/${userId}`)
        .then((res) => res.data);
}

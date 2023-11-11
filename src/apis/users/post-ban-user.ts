import { authAxiosClient } from "../../lib/axios";

export async function postBanUserApi(
    _id: string,
) {
    return authAxiosClient
        .post(`/user/ban/${_id}`)
        .then((res) => res.data);
}

import { authAxiosClient } from "../../lib/axios";

export async function getCategoryApi(
    _id: string,
) {
    return authAxiosClient
        .get(`/category/${_id}`)
        .then((res) => res.data);
}

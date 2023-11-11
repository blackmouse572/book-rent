import { authAxiosClient } from "../../lib/axios";

export async function putStatusBookApi(
    _id: string,
) {
    return authAxiosClient
        .put(`/book/status/${_id}`)
        .then((res) => res.data);
}

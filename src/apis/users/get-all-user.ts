import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse, User } from "../../types";
export type IGetAllUserResponse = IResponse<User[]>;

export async function getAllUserApi(
    params?: Partial<IQueryPagination & IQuerySearch>
) {
    return authAxiosClient
        .get("/user/list", {
            params,
        })
        .then((res) => res.data.data);
}

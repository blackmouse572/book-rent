import { IOrderCart } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";
export type IGetAllOrderCartResponse = IResponse<IOrderCart[]>;

export async function getAllOrderCartApi(
    params: Partial<IQueryPagination & IQuerySearch>
) {
    return authAxiosClient
        .post("/order", {
            params,
        })
        .then((res) => res.data);
}

export async function getAllCartApi(
) {
    return authAxiosClient
        .post("/order")
        .then((res) => res.data);
}

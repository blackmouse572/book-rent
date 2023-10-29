import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";
export type IGetAllOrderResponse = IResponse<IOrder[]>;

export async function getAllOrderApi(
    token: string,
    params: Partial<IQueryPagination & IQuerySearch>
) {
    console.log("Get order with token: " + token);
    return await authAxiosClient
        .get("/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        })
        .then((res) => res.data);
}

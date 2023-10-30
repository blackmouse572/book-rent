import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";
export type IGetAllOrderResponse = IResponse<IOrder[]>;

export async function getAllOrderApi(
    params: Partial<IQueryPagination & IQuerySearch>
) {
    return await authAxiosClient
        .get<IGetAllOrderResponse>("/order", {
            headers: {
                Authorization: `Bearer`,
            },
            params,
        })
        .then((res) => res.data);
}

import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";
export type IGetAllOrderResponse = IResponse<IOrder[]>;

export async function getAllOrderApi(
    params: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>
) {
    return await authAxiosClient
        .get("/order", {
            params,
        })
        .then((res) => res.data);
}

export type { IOrder };

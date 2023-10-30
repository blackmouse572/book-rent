import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IResponse } from "../../types";
import { AxiosError } from "axios";

export type IGetOrderResponse = IResponse<IOrder>;
async function getOrderApi(
    token: string,
    _id: string,
    callback: (error: AxiosError | null, result: IOrder | null) => void
) {
    console.log("Get Order with token: " + token);
    return await authAxiosClient
        .get<IGetOrderResponse>(`/order/${_id}`, { 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            callback(null, response.data.data);
        })
        .catch((error) => {
            callback(error, null);
        });
}

export { getOrderApi }

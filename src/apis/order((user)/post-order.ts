import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IResponse } from "../../types";
import { AxiosError } from "axios";

export type IPostOrderResponse = IResponse<IOrder>;

async function postOrderApi(
    orderData: IOrder, 
    callback: (error: AxiosError | null, result: IOrder | null) => void
) {
    return await authAxiosClient
        .post("/order", orderData, { 
            headers: {
                Authorization: `Bearer $`,
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

export { postOrderApi }

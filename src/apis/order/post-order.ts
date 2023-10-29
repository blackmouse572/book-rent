import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IResponse } from "../../types";
import { AxiosError } from "axios";

export type IPostOrderResponse = IResponse<IOrder>;

async function postOrderApi(
    token: string,
    orderData: object, // Change the parameter to accept order data
    callback: (error: AxiosError | null, result: IOrder | null) => void
) {
    console.log("Post Order with token: " + token);
    return await authAxiosClient
        .post<IPostOrderResponse>("/order", orderData, {  // Use .post for creating an order
            headers: {
                Authorization: `Bearer ${token}`,
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

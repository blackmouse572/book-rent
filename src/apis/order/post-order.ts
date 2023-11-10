import { authAxiosClient } from "../../lib/axios";
import { IOrder } from "@/types/order";

async function postOrderApi(orderData: IOrder) {
    return await authAxiosClient
        .post("/order", orderData, {})
        .then((response) => {
            if (response.status === 201) {
                return response.data;
            } else {
                // Handle other HTTP statuses as needed
                throw new Error("Request failed with status " + response.status);
            }
        })
        .catch((error) => {
            // Handle network errors or other issues
            throw error;
        });
}

export { postOrderApi }

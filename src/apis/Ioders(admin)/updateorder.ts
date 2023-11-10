import { authAxiosClient } from "../../lib/axios";
import { IOrder } from "@/types/order";

async function putOrderApi(_id: string, updatedOrderData: IOrder) {
    return await authAxiosClient
        .put(`/orders/detail/${_id}`, updatedOrderData, {})
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
               
                throw new Error("Request failed with status " + response.status);
            }
        })
        .catch((error) => {
          
            throw error;
        });
}

export { putOrderApi }; 
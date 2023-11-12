import { authAxiosClient } from "@/lib/axios";

export async function postTransactionApi(orderId: string, amount: string) {
    return await authAxiosClient
        .post("/transaction", { orderId, amount: +amount / 100 }, {})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            // Handle network errors or other issues
            throw error;
        });
}

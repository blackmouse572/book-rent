import { authAxiosClient } from "@/lib/axios";

export async function postTransactionApi(orderId: string, amount: string) {
    return await authAxiosClient
        .post("/transaction", { orderId, amount: +amount }, {})
        .then((response) => {
            if (response.status == 201) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}

import { authAxiosClient } from "@/lib/axios";
import { TRANSACTION_TYPE_ENUM } from "@/types/transaction";

export async function postTransactionApi(
    orderId: string,
    amount: string,
    type: TRANSACTION_TYPE_ENUM,
    payDateStamp: string
) {
    return await authAxiosClient
        .post(
            "/transaction",
            { orderId, amount: +amount / 100, type, payDateStamp },
            {}
        )
        .then((response) => {
            if (response.status == 201) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}

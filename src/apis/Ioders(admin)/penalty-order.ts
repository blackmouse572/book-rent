import { authAxiosClient } from "@/lib/axios";

const BASED_URL = import.meta.env.VERCEL_BASE || "http://localhost:5173/";
const RETURN_URL = BASED_URL + "penalty-payment-result";

async function penaltyOrderApi(
    _id: string,
    penalty: number,
    penaltyReason: string
) {
    return await authAxiosClient
        .put(
            `/orders/penalty/${_id}`,
            { penalty, penaltyReason, returnUrl: RETURN_URL },
            {}
        )
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(
                    "Request failed with status " + response.status
                );
            }
        })
        .catch((error) => {
            throw error;
        });
}

export { penaltyOrderApi };

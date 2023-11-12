import { authAxiosClient } from "@/lib/axios";

async function penaltyOrderApi(
    _id: string,
    penalty: number,
    penaltyReason: string
) {
    return await authAxiosClient
        .put(`/orders/penalty/${_id}`, { penalty, penaltyReason }, {})
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

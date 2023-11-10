import { authAxiosClient } from "../../lib/axios";


async function putOrderStatus(_id: string, status: string) {
    return await authAxiosClient
        .put(`/orders/${_id}/${status}`, { status: status }, {})
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

export { putOrderStatus }; 
import { ICategory } from "@/types/category";
import { authAxiosClient } from "../../lib/axios";

async function updateCategoryApi(
    _id: string,
    categoryData: ICategory) {
    return await authAxiosClient
        .put(`/category/${_id}`, categoryData)
        .then((response) => {
            if (response) {
                return response.data;
            } else {
                // Handle other HTTP statuses as needed
                throw new Error("Request failed with status " + response);
            }
        })
        .catch((error) => {
            // Handle network errors or other issues
            throw error;
        });
}

export { updateCategoryApi }

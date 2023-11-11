import { ICategory } from "@/types/category";
import { authAxiosClient } from "../../lib/axios";

async function postCategoryApi(categoryData: ICategory) {
    return await authAxiosClient
        .post("/category", categoryData, {})
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

export { postCategoryApi }

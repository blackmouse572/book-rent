import { authAxiosClient } from "../../lib/axios";

export async function deleteBookById(book_Id: string) {

    try {
        const response = await authAxiosClient.delete(`/book/${book_Id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

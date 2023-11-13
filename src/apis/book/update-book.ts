import { authAxiosClient } from "../../lib/axios";
import FormData from "form-data";

async function updateBookApi(
    _id: string,
    bookData: {
        category: string;
        genres: string;
        image: File | null;
        name: string;
        rental_price: number;
        description: string;
        keyword: string;
        author: string;
        status: "NEW" | "LIKE_NEW" | "DAMAGED";
        statusDescription: string;
    },
    image: File | null
) {
    const data = new FormData();
    data.append("name", bookData.name);
    data.append("rental_price", bookData.rental_price);
    data.append("category", bookData.category);
    data.append("description", bookData.description);
    data.append("keyword", bookData.keyword);
    data.append("genres", bookData.genres);
    data.append("author", bookData.author);
    data.append("status", bookData.status);
    data.append("statusDescription", bookData.statusDescription);

    if (image) {
        data.append("image", bookData.image);
    }

    return await authAxiosClient
        .put(`/book/${_id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            if (response.status) {
                return response.data;
            } else {
                // Handle other HTTP statuses as needed
                console.log(response);
                throw new Error(
                    "Request failed with status " + response.status
                );
            }
        })
        .catch((error) => {
            // Handle network errors or other issues
            throw error;
        });
}

export { updateBookApi };

import { authAxiosClient } from "@/lib/axios";

export async function postBookReview(data: {
    book_Id: string;
    data: {
        comment: string;
        rating: number;
    };
}) {
    return await authAxiosClient
        .post(`/review/${data.book_Id}`, {
            comment: data.data.comment,
            rating: data.data.rating,
        })
        .then((res) => res.data);
}

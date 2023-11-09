import { IBook } from "@/types/book";
import { axiosClient } from "../../lib/axios";
import { IDefaultQuery, IResponse } from "../../types";

export type IGetBookResponse = IResponse<IBook>;

export async function getBookById(book_Id: string) {
    return await axiosClient
        .get(`/book/${book_Id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data);
}

export type GetManyBooksParams = {
    genres?: string[];
    category?: string[];
} & Partial<IDefaultQuery>;

export async function getManyBooks(params: GetManyBooksParams) {
    return axiosClient
        .get("/book", {
            params,
        })
        .then((res) => res.data);
}

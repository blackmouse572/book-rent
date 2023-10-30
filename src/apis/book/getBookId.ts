import { IBook } from "@/types/book";
import { authAxiosClient } from "../../lib/axios";
import { IDefaultQuery, IQueryPagination, IQuerySearch, IResponse } from "../../types";

export type IGetBookResponse = IResponse<IBook>;

export async function getBookById(
    book_Id: string,
) {
    return await authAxiosClient
        .get<IBook>(`/book/${book_Id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data);
}
export type GetManyBooksParams = {
    genres?: string[];
    authors?: string[];
    reviews?: number;
} & Partial<IDefaultQuery>;
export type IGetAllBResponse = IResponse<User[]>;

export async function getManyBooks(
    params: Partial<IQueryPagination & IQuerySearch>
) {
    return authAxiosClient
    .get("/book/list", {
        params,
    })
    .then((res) => res.data);
}

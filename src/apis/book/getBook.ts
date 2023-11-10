import { IBook } from "@/types/book";
import { axiosClient } from "../../lib/axios";
import { IDefaultQuery, IGenre, IQueryPagination, IQuerySearch, IResponse, IReview } from "../../types";

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
    genres?: IGenre[];
    reviews?: IReview[];
} & Partial<IDefaultQuery>;

export async function getManyBooks(    params: Partial<IQueryPagination & IQuerySearch>
    ) {
    return axiosClient
        .get("/book/list", {
            params,
        })
        .then((res) => res.data);
}

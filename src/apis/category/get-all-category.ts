import { ICategory } from "@/types/category";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";
export type IGetAllCategoryResponse = IResponse<ICategory[]>;

export async function getAllCategoryApi(
    params: Partial<IQueryPagination & IQuerySearch>
) {
    return authAxiosClient
        .get("/category", {
            params,
        })
        .then((res) => res.data);
}


export async function getAllCategoryNoPramApi(
) {
    return authAxiosClient
        .get("/category")
        .then((res) => res.data);
}

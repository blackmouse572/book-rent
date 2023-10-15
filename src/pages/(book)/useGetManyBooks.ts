import { getManyBooks, GetManyBooksParams } from "@/apis/book";
import { IBook, IResponse } from "@/types";
import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";

export default function useGetManyBooks(
    params: GetManyBooksParams,
    options?: Omit<UseQueryOptions<IResponse<IBook[]>, unknown>, "queryKey">
): UseQueryResult<IResponse<IBook[]>, unknown> {
    return useQuery(["books", params], () => getManyBooks(params), options);
}

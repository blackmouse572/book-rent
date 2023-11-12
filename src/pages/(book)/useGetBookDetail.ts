import { getBookById } from "@/apis/book";
import { IBook } from "@/types";
import {
    UseQueryOptions,
    UseQueryResult,
    useQuery,
} from "@tanstack/react-query";

export default function useGetBookDetails(
    id: string,
    options?: Omit<UseQueryOptions<IBook, unknown>, "queryKey">
): UseQueryResult<IBook, unknown> {
    return useQuery(["book", id], () => getBookById(id), options);
}

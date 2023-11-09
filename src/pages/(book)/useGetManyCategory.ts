import { getAllCategories } from "@/apis/category/get-all-category";
import { ICategory } from "@/types/category";
import {
    UseQueryOptions,
    UseQueryResult,
    useQuery,
} from "@tanstack/react-query";

export default function useGetAllCategory(
    options?: Omit<UseQueryOptions<ICategory[], unknown>, "queryKey">
): UseQueryResult<ICategory[], unknown> {
    return useQuery(["category"], () => getAllCategories(), options);
}

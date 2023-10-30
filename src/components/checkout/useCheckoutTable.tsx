import { useQuery } from "@tanstack/react-query";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { API_GET_ALL_USER_QUERY_KEYS } from "../../apis/users";
import { IResponse } from "../../types";
import { IOrder } from "@/types/order";
import { getManyOrders } from "@/apis/order((user)";

export function useCheckoutTable(columns: ColumnDef<IOrder>[]) {
    const queryController = useQuery<IResponse<IOrder[]>, AxiosError>(
        [...API_GET_ALL_USER_QUERY_KEYS],
        () => getManyOrders(),
        {
            keepPreviousData: true,
        }
    );

    const table = useReactTable<IOrder>({
        columns,
        data: queryController.data?.data || [],
        initialState: {},
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getCoreRowModel(),
        getFacetedRowModel: getCoreRowModel(),
        getPaginationRowModel: getCoreRowModel(),
    });

    return {
        ...queryController,
        table,
    };
}

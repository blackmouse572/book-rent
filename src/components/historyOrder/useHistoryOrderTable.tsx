import { useQuery } from "@tanstack/react-query";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IQueryPagination, IQuerySearch, IResponse } from "@/types";
import { getAllOrderApi } from "@/apis/Ioders.ts/Ioders";
import { IOrder } from "@/apis/Ioders.ts/Ioders";

export function useHistoryOrderTable(columns: ColumnDef<IOrder>[]) {
    const [queries, setQueries] = useState<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
    >({
        page: 0,
        perPage: 10,
    });

    const queryController = useQuery<IResponse<IOrder[]>, AxiosError>(
        [],
        () => getAllOrderApi(queries),
        {
            keepPreviousData: true,
        }
    );

    const table = useReactTable<IOrder>({
        columns,
        data: queryController.data?.data || [],
        manualPagination: true,
        initialState: {
            pagination: {
                pageIndex: queries.page || 1 - 1,
                pageSize: queries.perPage,
            },
            globalFilter: queries.search,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getCoreRowModel(),
        getFacetedRowModel: getCoreRowModel(),
        getPaginationRowModel: getCoreRowModel(),
    });

    const [tableStates, setTableStates] = useState(table.initialState);

    table.setOptions((prev) => ({
        ...prev,
        state: tableStates,
        pageCount: queryController.data?._pagination?.totalPage || 0,
        onStateChange: setTableStates,
        debugTable: tableStates.pagination.pageIndex > 2,
    }));

    useEffect(() => {
        const otherFilters = tableStates.columnFilters;
        setQueries((prev) => ({
            ...prev,
            status: otherFilters?.[0]?.value,
            page: tableStates.pagination.pageIndex + 1,
            perPage: tableStates.pagination.pageSize,
            search: tableStates.globalFilter || undefined,
        }));
    }, [
        tableStates.columnFilters,
        tableStates.globalFilter,
        tableStates.pagination.pageIndex,
        tableStates.pagination.pageSize,
    ]);

    useEffect(() => {
        if (!queryController.data?._pagination) return;

        const pageCount = queryController.data?._pagination?.totalPage || 0;
        table.setPageCount(pageCount);
    }, [queryController.data?._pagination, table]);

    return {
        ...queryController,
        table,
        tableStates,
        setTableStates,
    };
}

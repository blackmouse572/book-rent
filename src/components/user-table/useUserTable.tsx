import { useQuery } from "@tanstack/react-query";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { API_GET_ALL_USER_QUERY_KEYS, getAllUserApi } from "../../apis/users";
import { mapFilterToQuery } from "../../lib/stringUtils";
import { IQueryPagination, IQuerySearch, User } from "../../types";

export function useUserTable(columns: ColumnDef<User>[]) {
    const [queries, setQueries] = useState<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
    >({});

    const queryControll = useQuery<User[], AxiosError>(
        [...API_GET_ALL_USER_QUERY_KEYS, queries],
        () => getAllUserApi(queries)
    );

    const table = useReactTable<User>({
        columns,
        data: queryControll.data || [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getCoreRowModel(),
        getFacetedRowModel: getCoreRowModel(),
        getPaginationRowModel: getCoreRowModel(),
    });
    const [tableStates, setTableStates] = useState(table.initialState);

    useEffect(() => {
        const facets = tableStates.columnFilters;
        const facetsQuery = mapFilterToQuery(facets);

        setQueries((prev) => ({
            ...prev,
            page: tableStates.pagination.pageIndex,
            perPage: tableStates.pagination.pageSize,
            // role: tableStates.faceted.filters.role,
            search: tableStates.globalFilter,
            ...facetsQuery,
        }));
    }, [tableStates]);

    table.setOptions((prev) => ({
        ...prev,
        state: tableStates,
        onStateChange: setTableStates,
        debugTable: tableStates.pagination.pageIndex > 2,
    }));

    return {
        ...queryControll,
        table,
        tableStates,
        setTableStates,
        queries,
        setQueries,
    };
}

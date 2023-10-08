import { Table } from "@tanstack/react-table";
import React from "react";
import { IQueryPagination, IQuerySearch, User } from "../../types";
import { DataTableFacetedFilter } from "../ui/data-table-facet";
import SearchInput from "../ui/search-input";
import { TableFacetFilter } from "../ui/table-facet";
import { TABLE_USER_ROLE_FACET_OPTIONS } from "./options";

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>;
    setSearchQuery?: React.Dispatch<
        React.SetStateAction<
            Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>
        >
    >;
}

export function UserTableToolbar({
    table,
    queries,
    setSearchQuery,
}: DataTableToolbarProps<User>) {
    // const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <SearchInput
                    value={queries.search || ""}
                    onChange={(value) => {
                        setSearchQuery?.((prev) => ({
                            ...prev,
                            search: value,
                        }));
                    }}
                />
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        title="Role"
                        options={TABLE_USER_ROLE_FACET_OPTIONS}
                    />
                )}
                {table.getColumn("role") && (
                    <TableFacetFilter
                        options={TABLE_USER_ROLE_FACET_OPTIONS}
                        title="Role"
                        column={table.getColumn("role")}
                    />
                )}
                {/* {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Priority"
                        options={priorities}
                    />

                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )} */}
            </div>
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    );
}

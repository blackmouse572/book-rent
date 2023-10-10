import { Table } from "@tanstack/react-table";
import React from "react";
import { IQueryPagination, IQuerySearch, User } from "../../types";
import { DataTableFacetedFilter } from "../ui/data-table-facet";
import SearchInput from "../ui/search-input";
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
        <div className="flex items-center justify-between border-b border-card">
            <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
                <SearchInput
                    value={queries.search || ""}
                    onChange={(value) => {
                        setSearchQuery?.((prev) => ({
                            ...prev,
                            search: value,
                        }));
                    }}
                    className="max-w-xs h-8"
                />
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        title="Role"
                        onOptionsChange={(options) => {
                            const role = options
                                .map((option) => option.value)
                                .join(",");
                            setSearchQuery?.((prev) => ({
                                ...prev,
                                role,
                            }));
                        }}
                        options={TABLE_USER_ROLE_FACET_OPTIONS}
                    />
                )}
            </div>
        </div>
    );
}

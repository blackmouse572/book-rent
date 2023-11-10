import { Table } from "@tanstack/react-table";
import React from "react";
import { cn } from "../../lib/utils";
import { IQueryPagination, IQuerySearch, User } from "../../types";
import { DataTableFacetedFilter } from "../ui/data-table-facet";
import SearchInput from "../ui/search-input";
import { TABLE_USER_ROLE_FACET_OPTIONS } from "./options";
import { CreateUser } from "@/components/user-table/manage-user/create-user";

export interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>;
    setSearchQuery?: (
        value: Partial<IQueryPagination & IQuerySearch> &
            Record<string, unknown>
    ) => void;
}

export function UserTableToolbar({
    table,
    queries,
    setSearchQuery,
    className,
    ...props
}: DataTableToolbarProps<User>) {
    return (
        <div
            className={cn(
                "flex items-center justify-between border-b border-card",
                className
            )}
            {...props}
        >
            <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
                <SearchInput
                    value={queries.search || ""}
                    onChange={(value) => {
                        setSearchQuery &&
                            setSearchQuery({
                                ...queries,
                                search: value,
                            });
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
                            setSearchQuery &&
                                setSearchQuery({
                                    ...queries,
                                    role,
                                });
                        }}
                        options={TABLE_USER_ROLE_FACET_OPTIONS}
                    />
                )}
                <CreateUser />
            </div>
        </div>
    );
}

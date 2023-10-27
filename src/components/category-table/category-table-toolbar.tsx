import { Table } from "@tanstack/react-table";
import React from "react";
import { cn } from "../../lib/utils";
import { IQueryPagination, IQuerySearch } from "../../types";
import SearchInput from "../ui/search-input";
import { ICategory } from "@/types/category";

export interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>;
    setSearchQuery?: (
        value: Partial<IQueryPagination & IQuerySearch> &
            Record<string, unknown>
    ) => void;
}

export function CategoryTableToolbar({
    queries,
    setSearchQuery,
    className,
    ...props
}: DataTableToolbarProps<ICategory>) {
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
            </div>
        </div>
    );
}

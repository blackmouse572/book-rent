import { Table } from "@tanstack/react-table";
import React from "react";
import { cn } from "../../lib/utils";
import { IBook, IQueryPagination, IQuerySearch } from "../../types";
import { DataTableFacetedFilter } from "../ui/data-table-facet";
import SearchInput from "../ui/search-input";
import { TABLE_BOOK_STATUS_FACET_OPTIONS } from "@/components/book-table/options";
import { CreateBook } from "@/components/book-table/manage-book/create-book";

export interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>;
    setSearchQuery?: (
        value: Partial<IQueryPagination & IQuerySearch> &
            Record<string, unknown>
    ) => void;
}

export function BookTableToolbar({
    table,
    queries,
    setSearchQuery,
    className,
    ...props
}: DataTableToolbarProps<IBook>) {
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
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        title="Status"
                        onOptionsChange={(options) => {
                            const status = options
                                .map((option) => option.value)
                                .join(",");
                            setSearchQuery &&
                                setSearchQuery({
                                    ...queries,
                                    status,
                                });
                        }}
                        options={TABLE_BOOK_STATUS_FACET_OPTIONS}
                    />
                )}
                <CreateBook />
            </div>
        </div>
    );
}

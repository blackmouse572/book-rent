import React from "react";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { useCategoryTable } from "./useCategoryTable";
import { columns } from "./category-table-column";
import { CategoryTableToolbar } from "@/components/category-table/category-table-toolbar";

function CategoryTable() {
    const { isError, isLoading, table, error, refetch, data, tableStates } =
        useCategoryTable(columns);

    const renderHeader = React.useMemo(() => {
        return (
            <CategoryTableToolbar
                table={table}
                queries={{
                    page: tableStates.pagination.pageIndex + 1,
                    pageSize: tableStates.pagination.pageSize,
                    search: tableStates.globalFilter,
                }}
                setSearchQuery={(value) => {
                    table.setGlobalFilter(value.search);
                    table.setColumnFilters(() => [
                        {
                            id: "status",
                            value: value.status,
                        },
                    ]);
                }}
            />
        );
    }, [
        table,
        tableStates.pagination.pageIndex,
        tableStates.pagination.pageSize,
        tableStates.globalFilter,
    ]);

    return (
        <div className="mt-8">
            {isError && <Button onClick={() => refetch()}>Retry</Button>}
            {isError && <p>{error?.message}</p>}
            <DataTable
                table={table}
                isLoading={isLoading}
                header={renderHeader}
                columns={columns}
                data={data || []}
            />
        </div>
    );
}

export default CategoryTable;

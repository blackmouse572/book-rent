import React from "react";
import TableSizeSelector from "../table-size-selector";
import { Button } from "../ui/button/button";
import { DataTable } from "../ui/data-table";
import Paginition from "../ui/paginition";
import { Skeleton } from "../ui/skeleton";
import { useUserTable } from "./useUserTable";
import { columns } from "./user-table-column";
import { UserTableToolbar } from "./user-table-toolbar";

function UserTable() {
    const { isError, isLoading, table, error, refetch, data, tableStates } =
        useUserTable(columns);

    const renderFooter = React.useMemo(() => {
        if (isLoading)
            return (
                <div className="px-3 py-1.5 flex justify-end gap-2">
                    <Skeleton className="w-20 h-8" />
                    <Skeleton className="w-20 h-8" />
                </div>
            );
        return (
            <>
                <Paginition
                    currentPage={tableStates.pagination.pageIndex + 1}
                    totalPage={data?._pagination?.totalPage || 1}
                    onPageChange={(index) => {
                        table.setPageIndex(index - 1);
                    }}
                    onNextPage={() => {
                        table.nextPage();
                    }}
                    onPreviousPage={() => {
                        table.previousPage();
                    }}
                    canPreviousPage={table.getCanPreviousPage()}
                    canNextPage={table.getCanNextPage()}
                />
                <TableSizeSelector
                    className="max-w-[100px] "
                    defaultSize={table.getState().pagination.pageSize}
                    onChange={(value) => {
                        table.setPageSize(value);
                    }}
                />
            </>
        );
    }, [isLoading, tableStates.pagination.pageIndex, table, data]);

    const renderHeader = React.useMemo(() => {
        return (
            <UserTableToolbar
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
                            id: "role",
                            value: value.role,
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
        <div className="container mx-auto min-h-screen w-full">
            <div className="mt-8">
                {isError && <Button onClick={() => refetch()}>Retry</Button>}
                {isError && <p>{error?.message}</p>}
                <DataTable
                    table={table}
                    isLoading={isLoading}
                    header={renderHeader}
                    columns={columns}
                    data={data?.data || []}
                    footer={
                        <div className="px-3 py-1.5 flex justify-end gap-2">
                            {renderFooter}
                        </div>
                    }
                />
            </div>
        </div>
    );
}

export default UserTable;

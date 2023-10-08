import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Table as ITable } from "@tanstack/table-core";
import React, { useMemo } from "react";
import { Icons } from "../icons";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
    isLoading?: boolean;
    table: ITable<TData>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    footer,
    header,
    table,
    isLoading = false,
}: DataTableProps<TData, TValue>) {
    const renderHeader = useMemo(() => {
        if (!header) return;

        return <div>{header}</div>;
    }, [header]);

    const renderFooter = useMemo(() => {
        if (!footer) return;

        return <div>{footer}</div>;
    }, [footer]);

    const renderBody = useMemo(() => {
        if (isLoading)
            return (
                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <div className="flex flex-col justify-center items-center font-medium text-lg uppercase gap-2 opacity-25 m-8">
                            <Icons.loader
                                className="animate-spin ease-in"
                                size={30}
                            />
                            <p>Loading...</p>
                        </div>
                    </TableCell>
                </TableRow>
            );

        if (!data.length)
            return (
                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <div className="flex flex-col justify-center items-center font-medium text-lg uppercase gap-2 opacity-25 m-8">
                            <Icons.emptyFilled size={70} />
                            <p>No results.</p>
                        </div>
                    </TableCell>
                </TableRow>
            );

        return table.getRowModel().rows.map((row) => (
            <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </TableCell>
                ))}
            </TableRow>
        ));
    }, [columns.length, data.length, isLoading, table]);

    return (
        <div className="rounded-md border">
            {renderHeader}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>{renderBody} </TableBody>
            </Table>
            {renderFooter}
        </div>
    );
}

import TableSizeSelector from "../../components/table-size-selector";
import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/ui/data-table";
import { useUserTable } from "../../components/user-table/useUserTable";
import { columns } from "../../components/user-table/user-table-column";
import { UserTableToolbar } from "../../components/user-table/user-table-toolbar";

function UserManagerPage() {
    const {
        isError,
        isLoading,
        table,
        error,
        refetch,
        data,
        setTableStates,
        tableStates,
        queries,
        setQueries,
    } = useUserTable(columns);
    return (
        <div className="container mx-auto min-h-screen w-full">
            <div className="mt-8">
                {isError && <Button onClick={() => refetch()}>Retry</Button>}
                {isError && <p>{error?.message}</p>}
                <DataTable
                    table={table}
                    isLoading={isLoading}
                    header={
                        <div className="space-y-2">
                            <UserTableToolbar
                                table={table}
                                queries={queries}
                                setSearchQuery={setQueries}
                            />
                        </div>
                    }
                    columns={columns}
                    data={data || []}
                    footer={
                        <TableSizeSelector
                            defaultSize={tableStates.pagination.pageSize || 10}
                            sizes={[1, 2, 10]}
                            onChange={(value) => {
                                console.log("Set page size into", value);
                                setTableStates((prev) => ({
                                    ...prev,
                                    pagination: {
                                        ...prev.pagination,
                                        pageSize: value,
                                    },
                                }));
                            }}
                        />
                    }
                />
            </div>
        </div>
    );
}

export default UserManagerPage;

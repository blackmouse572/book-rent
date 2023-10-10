import TableSizeSelector from "../table-size-selector";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { useUserTable } from "./useUserTable";
import { columns } from "./user-table-column";
import { UserTableToolbar } from "./user-table-toolbar";

function UserTable() {
    const {
        isError,
        isLoading,
        table,
        error,
        refetch,
        data,
        setTableStates,
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
                            className="max-w-[100px]"
                            onChange={(value) => {
                                setQueries((prev) => ({
                                    ...prev,
                                    perPage: value,
                                }));
                            }}
                        />
                    }
                />
            </div>
        </div>
    );
}

export default UserTable;

import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { useCheckoutTable } from "./useCheckoutTable";
import { columns } from "./checkout-table-column";

function CheckoutTable() {
    const { isError, isLoading, table, error, refetch, data} =
    useCheckoutTable(columns);
  return (
        <div className="container mx-auto w-full">
            <div className="mt-8 mb-8">
                {isError && <Button onClick={() => refetch()}>Retry</Button>}
                {isError && <p>{error?.message}</p>}
                <DataTable
                    table={table}
                    isLoading={isLoading}
                    columns={columns}
                    data={data?.data || []}
                />
            </div>
        </div>
    );
}

export default CheckoutTable;

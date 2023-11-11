import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/apis/Ioders.ts/Ioders";
import { Badge } from "../ui/badge/badge";

export const historyOrderColumns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "id",
        header: "id",
        cell({ row }) {
            const { _id } = row.original;
            return (
                <div className="flex gap-2">
                    <div className="">
                        <h6 className="font-medium">{_id}</h6>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "rentalDate",
        header: "Rental Date",
        cell({ getValue }) {
            const rentalDate: Date = getValue() as Date;
            return <p>{rentalDate.toString()}</p>;
        },
    },
    {
        accessorKey: "returnDate",
        header: "Return Date",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{returnDate.toString()}</p>;
        },
    },
    {
        accessorKey: "pickupLocation",
        header: "Pickup Location",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{returnDate.toString()}</p>;
        },
    },
    {
        accessorKey: "returnLocation",
        header: "Return Location",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{returnDate.toString()}</p>;
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price ",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{returnDate.toString()}</p>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell({ getValue }) {
            const STATUS: "REJECTED" | "RETURNED" | "CANCELLED" | "PENDING" =
                getValue() as "REJECTED" | "RETURNED" | "CANCELLED" | "PENDING";
            return <Badge>{STATUS}</Badge>;
        },
    },
    {
        accessorKey: "depositType",
        header: "DepositType",
        cell({ getValue }) {
            const depositType: "ONLINE" | "COD" = getValue() as
                | "ONLINE"
                | "COD";
            return <Badge>{depositType}</Badge>;
        },
    },
];

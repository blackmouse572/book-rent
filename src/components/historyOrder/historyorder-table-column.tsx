import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/apis/Ioders.ts/Ioders";
import { Badge } from "../ui/badge/badge";

export const historyOrderColumns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "nameBook",
        header: "Name",
        cell({ row }) {
            const { nameBook, imageBook } = row.original;
            return (
                <div className="flex gap-2">
                    <img src={imageBook} alt={nameBook} className="w-16 h-16" />
                    <div className="">
                        <h6 className="font-medium">{nameBook}</h6>
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
            const status: "SHIPPING" | "DONE" | "EXPIRED" = getValue() as
                | "SHIPPING"
                | "DONE"
                | "EXPIRED";
            return <Badge>{status}</Badge>;
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

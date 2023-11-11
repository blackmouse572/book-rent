import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/apis/order(user)/get-all-order";
import { Badge } from "../ui/badge/badge";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export const historyOrderColumns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "index",
        header: "No",
        cell({ row }) {
            return <p>{row.index + 1}</p>;
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
        accessorKey: "totalPrice",
        header: "Total Price ",
        cell({ getValue }) {
            const totalPrice: number = getValue() as number;
            return <p>{totalPrice}</p>;
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
    {
        accessorKey: "_id",
        header: "Action",
        cell({ row }) {
            const { _id } = row.original;
            return (
                <div className="flex gap-2 ">
                    <Link to={`/order/${_id}`}>
                        <Button variant="outline" size="sm">
                            Detail
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];

import { IOrder } from "@/apis/Ioders(admin)/Ioders";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge/badge";

import { UpdateOrder } from "@/components/historyOrder(admin)/dialogOrder";
import { UpdateStatusOrder } from "@/components/historyOrder(admin)/orderStatus";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { PenaltyOrder } from "@/components/historyOrder(admin)/penaltyOrderDialog";

export const historyOrderColumns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "index",
        header: "No",
        cell({ row }) {
            const id = row.original._id;
            return <Link to={`/admin/orders/${id}`}>{id}</Link>;
        },
    },

    {
        accessorKey: "rentalDate",
        header: "Rental Date",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{format(new Date(returnDate), "dd/MM/yyyy")}</p>;
        },
    },
    {
        accessorKey: "returnDate",
        header: "Return Date",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            return <p>{format(new Date(returnDate), "dd/MM/yyyy")}</p>;
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price ",
        cell({ getValue }) {
            const totalPrice: number = getValue() as number;
            return <p>{formatPrice(totalPrice)}</p>;
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
            const { _id, status } = row.original;
            if (_id)
                return (
                    <div className="flex gap-2 ">
                        <Link to={`/order/${_id}`}>
                            <Button variant="outline" size="sm">
                                Detail
                            </Button>
                        </Link>
                        <UpdateOrder orderId={_id} />
                        <UpdateStatusOrder
                            orderId={_id}
                            defaultStatus={status}
                        />
                        <PenaltyOrder orderId={_id} />
                    </div>
                );
        },
    },
];

import { ITransaction } from "@/types/transaction";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<ITransaction>[] = [
    {
        accessorKey: "_id",
        header: "Id",
        cell({ getValue }) {
            const _id: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{_id}</p>;
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell({ getValue }) {
            const user = getValue() as User;
            return (
                <p className="text-slate-400 max-w-[30rem]">{user?.username}</p>
            );
        },
    },
    {
        accessorKey: "order",
        header: "Order",
        cell({ getValue }) {
            const orderId: string = getValue() as string;
            return (
                <Link to={`/order/${orderId}`}>
                    <p className="text-slate-400 max-w-[30rem]">{orderId}</p>
                </Link>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell({ getValue }) {
            const amount: number = getValue() as number;
            return <p className="text-slate-400 max-w-[30rem]">{amount}</p>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell({ getValue }) {
            const date: Date = getValue() as Date;
            return (
                <p className="text-slate-400 max-w-[30rem]">
                    {date.toString()}
                </p>
            );
        },
    },
];

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button/button";
import { IBook } from "@/types/book";
import { Link } from "react-router-dom";
import { StatusButton } from "@/components/book-table/manage-book/book-status";
import { UpdateBook } from "@/components/book-table/manage-book/update-book";
import { RemoveBookApi } from "@/components/book-table/manage-book/remove-book";

export const columns: ColumnDef<IBook>[] = [
    {
        accessorKey: "_id",
        header: "Id",
        cell({ getValue }) {
            const _id: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{_id}</p>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell({ getValue }) {
            const name: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{name}</p>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell({ getValue }) {
            const description: string = getValue() as string;
            return (
                <p className="text-slate-400 max-w-[30rem]">{description}</p>
            );
        },
    },
    {
        accessorKey: "rental_price",
        header: "Rental_price",
        cell({ getValue }) {
            const rental_price: string = getValue() as string;
            return (
                <p className="text-slate-400 max-w-[30rem]">{rental_price}</p>
            );
        },
    },
    // {
    //     accessorKey: "isAvailable",
    //     header: "Available",
    //     cell({ getValue }) {
    //         const isAvailable: boolean = getValue() as boolean;
    //         return (
    //             <p className="text-slate-400 max-w-[30rem]">{isAvailable}</p>
    //         );
    //     },
    // },
    {
        accessorKey: "status",
        header: "Status",
        cell({ row }) {
          const { _id, status } = row.original;
          return (
            <StatusButton bookId={_id!} status={status!} />
          );
        },
      },
    {
        accessorFn: ({ _id }) => _id,
        header: "Action",
        cell({ getValue }) {
            const _id: string = getValue() as string;
            return (
                <div className="flex gap-2 ">  
                    <Button variant="outline" size="sm">
                        <Link to={`/admin/book/${_id}`}> Detail</Link> 
                    </Button>                                 
                    <RemoveBookApi bookId={_id} />
                    <UpdateBook bookId={_id}/>
                </div>
            );
        },
    },
];
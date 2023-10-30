import { ColumnDef } from "@tanstack/react-table";
import { DEPOSITTYPE, IOrder, IOrderCart } from "@/types/order";

const columns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "_id",
        header: "Id",
        cell({ getValue }) {
            const _id: string = getValue() as string;
            return (
                <div className="flex">
                    <h6 className="font-medium">{_id}</h6>
                </div>
            );
        },
    },
    {
        accessorKey: "cart",
        header: "Cart",
        cell({ getValue }) {
            const cart: IOrderCart = getValue() as IOrderCart;
    
            return (
                <div className="flex items-center">
                    <div>{cart.bookId}</div>
                    <div>{cart.quantity}</div>
                </div>
            );
        },
    },    
    {
        accessorKey: "rentalDate",
        header: "Rentat Date",
        cell({ getValue }) {
            const rentalDate: Date = getValue() as Date;
            const formattedRentalDate = rentalDate.toLocaleString(); 
            return (
                <div className="flex items-center">
                    <p className="text-slate-400 max-w-[30rem]">{formattedRentalDate}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "returnDate",
        header: "Return Date",
        cell({ getValue }) {
            const returnDate: Date = getValue() as Date;
            const formattedReturnDate = returnDate.toLocaleString(); 
            return (
                <div className="flex items-center">
                    <p className="text-slate-400 max-w-[30rem]">{formattedReturnDate}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "pickupLocation",
        header: "Pick Up Location",
        cell({ getValue }) {
            const pickupLocation: string = getValue() as string;
            return (
                <div className="flex">
                    <h6 className="font-medium">{pickupLocation}</h6>
                </div>
            );
        },
    },
    {
        accessorKey: "returnLocation",
        header: "Return Location",
        cell({ getValue }) {
            const returnLocation: string = getValue() as string;
            return (
                <div className="flex">
                    <h6 className="font-medium">{returnLocation}</h6>
                </div>
            );
        },
    },
    {
        accessorKey: "depositType",
        header: "Deposit Type",
        cell({ getValue }) {
            const depositType: DEPOSITTYPE = getValue() as DEPOSITTYPE;
            return (
                <div className="flex">
                    <h6 className="font-medium">{depositType}</h6>
                </div>
            );
        },
    },
];

export default columns;

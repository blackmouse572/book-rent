import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types/order";
import { Avatar, AvatarImage } from "../ui/avatar";

export const columns: ColumnDef<IProduct>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell({ row }) {
            const { name, image} = row.original;
            return (
                <div className="flex">
                    <Avatar>
                    <AvatarImage src={image} alt={name} />
                    </Avatar>
                    <h6 className="font-medium">{name}</h6>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell({ getValue }) {
            const price: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{price}</p>;
        },
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell({ getValue }) {
            const quantity: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{quantity}</p>;
        },
    },
    {
        accessorFn: ({ quantity, price }) => ({ quantity, price }),
        header: "Total",
        cell({ getValue }) {
            const { quantity, price } = getValue() as {
                quantity: string;
                price: string;
            };
            const totalCost = (
                parseFloat(quantity) * parseFloat(price)
            ).toFixed(2);
            return <p className="text-slate-400 max-w-[30rem]">{totalCost}</p>;
        },
    },
];

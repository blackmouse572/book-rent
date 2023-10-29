import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button/button";
import { ICategory } from "@/types/category";

export const columns: ColumnDef<ICategory>[] = [
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
            return <p className="text-slate-400 max-w-[30rem]">{description}</p>;
        },
    },
    {
        accessorFn: ({ _id }) => _id,
        header: "Action",
        cell() {
            return (
                <div className="flex gap-2 ">
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        Delete
                    </Button>
                </div>
            );
        },
    },
];

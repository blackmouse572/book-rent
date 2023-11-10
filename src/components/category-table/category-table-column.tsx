import { ColumnDef } from "@tanstack/react-table";
import { ICategory, STATUS } from "@/types/category";
import { Badge } from "@/components/ui/badge";
import { UpdateCategory } from "@/components/category-table/manage-category/update-category";

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
        accessorKey: "status",
        header: "Status",
        cell({ getValue }) {
            const status: STATUS = getValue() as STATUS;
            return <Badge>{status}</Badge>;
        },
    },
    {
        accessorFn: ({ _id }) => _id,
        header: "Action",
        cell({ getValue }) {
          const _id: string = getValue() as string;
          return (
            <div className="flex gap-2">
              <UpdateCategory categoryId={_id} />
            </div>
          );
        },
    },           
];

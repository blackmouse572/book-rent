import { ColumnDef } from "@tanstack/react-table";
import { getLabelByFullname } from "../../lib/utils";
import { ROLE, User } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge/badge";
import { Button } from "../ui/button/button";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "user",
        header: "Name",
        cell({ row }) {
            const { avatar, fullName, username } = row.original;
            return (
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarFallback>
                            {getLabelByFullname(fullName)}
                        </AvatarFallback>
                        <AvatarImage src={avatar} alt={fullName} />
                    </Avatar>
                    <div className="">
                        <h6 className="font-medium">{fullName}</h6>
                        <p className="text-slate-400">@{username}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell({ getValue }) {
            const role: ROLE = getValue() as ROLE;
            return <Badge>{role}</Badge>;
        },
    },
    {
        accessorKey: "address",
        header: "Address",
        cell({ getValue }) {
            const address: string = getValue() as string;
            return <p className="text-slate-400 max-w-[30rem]">{address}</p>;
        },
    },
    {
        accessorFn: ({ _id }) => _id,
        header: "Action",
        cell() {
            return (
                <div className="flex gap-2 ">
                    <Button variant="outline" size="sm">
                        Ban
                    </Button>
                    <Button variant="outline" size="sm">
                        Delete
                    </Button>
                </div>
            );
        },
    },
];

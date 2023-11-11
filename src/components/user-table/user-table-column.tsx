import { ColumnDef } from "@tanstack/react-table";
import { getLabelByFullname } from "../../lib/utils";
import { ROLE, User } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge/badge";
import { UserDetail } from "@/components/user-table/manage-user/user-detail";
import { BanUserApi } from "@/components/user-table/manage-user/user-ban";
import { UnBanUserApi } from "@/components/user-table/manage-user/user-unban";

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
        accessorKey: "_id",
        header: "Action",
        cell({ row }) {
            const { _id, blocked } = row.original;
            return (
                <div className="flex gap-2 ">
                    {blocked ? (
                        _id ? (
                            <UnBanUserApi userId={_id} />
                        ) : null
                    ) : (
                        _id ? (
                            <BanUserApi userId={_id} />
                        ) : null
                    )}
                    {_id && <UserDetail userid={_id} />}{" "}
                </div>
            );
        },
    }
    
];

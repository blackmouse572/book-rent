import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types";
import { format } from "date-fns";

type Props = {
    user: User | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

function UserDetailDialog({ children, user }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="custom-dialog-content max-w-screen-xl">
                <DialogHeader>
                    <DialogTitle>User Detail</DialogTitle>
                </DialogHeader>
                <div className="flex gap-5 space-y-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex flex-column">
                            <Label className="font-semibold">Id:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?._id}
                            </p>
                        </div>

                        <div className=" flex flex-column">
                            <Label className="font-semibold">Full Name: </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.fullName}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Email:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.email}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Role:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.role}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Phone:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.phone}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Address:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.address}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Create at:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.createdAt
                                    ? format(new Date(user?.createdAt), "PPpp")
                                    : "N/A"}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">Update at:</Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.updatedAt
                                    ? format(new Date(user?.updatedAt), "PPpp")
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className=" flex flex-column">
                            <Label className="font-semibold">User Name: </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.username}
                            </p>
                        </div>
                        <div className="flex flex-column">
                            <Label className="font-semibold">Blocked: </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.blocked ? (
                                    <Icons.check />
                                ) : (
                                    <Icons.close />
                                )}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Blocked Date:
                            </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.blockedDate
                                    ? format(
                                          new Date(user?.blockedDate),
                                          "PPpp"
                                      )
                                    : "N/A"}
                            </p>
                        </div>

                        <Separator className="m-5" />

                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Citizen Id:{" "}
                            </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.citizenId}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Citizen Id Type:{" "}
                            </Label>
                            <Badge className="h-fit text-sm ml-5">
                                {user?.citizenIdType}
                            </Badge>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Citizen Id Date Of Birth:{" "}
                            </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.citizenIdDateOfBirth
                                    ? format(
                                          new Date(user?.citizenIdDateOfBirth),
                                          "PPpp"
                                      )
                                    : "N/A"}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Citizen Id Issue Date:{" "}
                            </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.citizenIdIssueDate
                                    ? format(
                                          new Date(user?.citizenIdIssueDate),
                                          "PPpp"
                                      )
                                    : "N/A"}
                            </p>
                        </div>
                        <div className=" flex flex-column">
                            <Label className="font-semibold">
                                Citizen Id Place Of Issue:{" "}
                            </Label>
                            <p className="text-gray-700 text-sm pl-5">
                                {user?.citizenIdPlaceOfIssue}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UserDetailDialog;

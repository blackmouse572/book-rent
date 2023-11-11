import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { getUserApi } from "@/apis/users/get-user";
import { Label } from "@radix-ui/react-label";

export function UserDetail({ userid }: { userid: string }) {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserApi(userid)
            .then((user: User) => {
                if (user && user._id) {
                    setUser(user);
                } else {
                    toast({
                        title: "Invalid user response",
                        description: "No user ID in the response.",
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: "Error user detail",
                    description: error.message,
                });
            });
    }, [userid]);
    {
        console.log(user);
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Detail</Button>
                </DialogTrigger>
                <DialogContent className="custom-dialog-content max-w-screen-xl">
                    <DialogHeader>
                        <DialogTitle>User Detail</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-column">
                        <div className="">
                            <div className="flex flex-column">
                                <Label className="font-semibold">Id:</Label>
                                <p className="text-gray-700 pl-5">{user?._id}</p>
                            </div>

                            <div className=" flex flex-column">
                                <Label className="font-semibold">Full Name: </Label>
                                <p className="text-gray-700 pl-5">{user?.fullName}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Email:</Label>
                                <p className="text-gray-700 pl-5">{user?.email}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Role:</Label>
                                <p className="text-gray-700 pl-5">{user?.role}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Phone:</Label>
                                <p className="text-gray-700 pl-5">{user?.phone}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Address:</Label>
                                <p className="text-gray-700 pl-5">{user?.address}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Create at:</Label>
                                <p className="text-gray-700 pl-5">{user?.createdAt ? user?.createdAt.toLocaleString() : 'N/A'}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Update at:</Label>
                                <p className="text-gray-700 pl-5">{user?.updatedAt ? user?.updatedAt.toLocaleString() : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="ml-10">
                            <div className=" flex flex-column">
                                <Label className="font-semibold">User Name: </Label>
                                <p className="text-gray-700 pl-5">{user?.username}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Password: </Label>
                                <p className="text-gray-700 pl-5">{user?.password}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Password Attempt: </Label>
                                <p className="text-gray-700 pl-5">{user?.passwordAttempt}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Salt: </Label>
                                <p className="text-gray-700 pl-5">{user?.salt}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Blocked: </Label>
                                <p className="text-gray-700 pl-5">{user?.blocked ? "True" : "False"}</p>
                            </div>
                            <div className=" flex flex-column">
                                <Label className="font-semibold">Blocked Date: </Label>
                                <p className="text-gray-700 pl-5">{user?.blockedDate ? user.blockedDate.toLocaleString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

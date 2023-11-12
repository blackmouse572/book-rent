import { getUserApi } from "@/apis/users/get-user";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import UserDetailDialog from "@/components/user-detail-dialog";
import { User } from "@/types";
import { useEffect, useState } from "react";

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

    return (
        <div>
            <UserDetailDialog user={user}>
                <Button>Detail</Button>
            </UserDetailDialog>
        </div>
    );
}

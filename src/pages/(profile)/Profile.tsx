import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserDetailDialog from "@/components/user-detail-dialog";
import { useAuth } from "@/hooks/useAuth";
import ChangePasswordModal from "@/pages/(profile)/change-password-model";
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar";

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <div className="container flex justify-center items-center h-screen flex-col mx-auto gap-4">
            <h3 className="font-bold text-4xl">
                👋 Welcome back{" "}
                <span className="text-primary">{user?.fullName}</span>
            </h3>
            <Separator className="max-w-sm" />
            <Card>
                <CardHeader className="flex-row justify-center items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            sizes={"lg"}
                            src={user?.avatar ?? ""}
                            alt={user?.fullName}
                        />
                        <AvatarFallback>{user?.fullName}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-xl">{user?.fullName}</h3>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                </CardHeader>
                <CardContent className="flex">
                    <ChangePasswordModal>
                        <Button variant={"link"}>Change Password</Button>
                    </ChangePasswordModal>
                    <Separator className="h-[none]" orientation="vertical" />
                    <Link to="/profile/orders">
                        <Button variant={"link"}>Order history</Button>
                    </Link>
                    <Separator className="h-[none]" orientation="vertical" />
                    <Link to="/transaction">
                        <Button variant={"link"}>Payment history</Button>
                    </Link>
                </CardContent>
                <CardFooter className="space-x-2">
                    <UserDetailDialog user={user!}>
                        <Button colors={"secondary"}>My profile details</Button>
                    </UserDetailDialog>
                    <Button colors={"destructive"} onClick={onLogout}>
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Profile;

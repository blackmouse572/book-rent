import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import ChangePasswordModal from "@/pages/(profile)/change-password-model";
import { useNavigate } from "react-router-dom";
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

                    <Button variant={"link"}>Settings</Button>
                </CardContent>
                <CardFooter>
                    <Button onClick={onLogout}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Profile;
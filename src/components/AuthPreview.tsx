import { profileApi } from "@/apis/auth/apis/profile.api";
import { useAuth } from "@/hooks/useAuth";
import { cn, getLabelByFullname } from "@/lib/utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

type Props = React.HTMLAttributes<HTMLDivElement>;

function AuthPreview({ className, ...prosp }: Props) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogin = () => {
        navigate("/login");
    };
    const onLogout = () => {
        logout();
        navigate("/");
    };

    const onGetProfile = () => {
        const accessToken = localStorage.getItem("access_token");
        profileApi(accessToken!, (err, profile) => {
            if (err) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: err.message,
                });
            } else {
                console.log(JSON.stringify(profile));
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Get profile success",
                });
            }
        });
    };
    return (
        <div className={cn(className)} {...prosp}>
            {user ? (
                <div className="user-profile">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback>
                    {getLabelByFullname(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="user-info">
                  <h6>{user.fullName}</h6>
                  <p>{user.email}</p>
                </div>
                <div className="user-actions">
                  <Button onClick={onGetProfile}>Get profile</Button>
                  <Button
                    variant="ghost"
                    colors="destructive"
                    className="w-fit px-2 hover:text-white"
                    onClick={onLogout}
                  >
                    <Icons.signOut size={16} />
                  </Button>
                </div>
              </div>
            ) : (
                <Button onClick={onLogin}>Login</Button>
            )}
        </div>
    );
}

export default AuthPreview;

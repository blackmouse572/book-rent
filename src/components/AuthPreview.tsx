import { profileApi } from "@/apis/auth/apis/profile.api";
import { Icons } from "@/components/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn, getLabelByFullname } from "@/lib/utils";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
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
        <div className={(cn(className), "flex")} {...prosp}>
            <DropdownMenu>
                {user ? (
                    <React.Fragment>
                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                }),
                                "px-2 mx-4"
                            )}
                            to="#"
                        >
                            <Icons.bell />
                        </Link>
                        <DropdownMenuTrigger className="user-profile flex gap-2 items-center justify-start">
                            <Avatar>
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.fullName}
                                />
                                <AvatarFallback>
                                    {getLabelByFullname(user.fullName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-start">
                                <h6 className="font-medium">{user.fullName}</h6>
                                <p className="text-xs text-accent-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onGetProfile}>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                inset
                                onClick={onLogout}
                                className="text-destructive hover:bg-destructive/20 hover:text-destructive"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </React.Fragment>
                ) : (
                    <Button onClick={onLogin}>Login</Button>
                )}
            </DropdownMenu>
        </div>
    );
}

export default AuthPreview;
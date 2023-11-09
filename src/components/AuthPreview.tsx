import { profileApi } from "@/apis/auth/apis/profile.api";
import ShoppingCart from "@/components/cart/cart";
import { Icons } from "@/components/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn, getLabelByFullname } from "@/lib/utils";
import { ROLE } from "@/types";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "./ui/use-toast";

export const ADMIN_SECTION_ITEMS: {
    to: string;
    title: string;
    icon: keyof typeof Icons;
}[] = [
    {
        to: "/admin",
        title: "Dashboard",
        icon: "dashboard",
    },
    {
        to: "/admin/user",
        title: "Users",
        icon: "user",
    },
    {
        to: "/admin/book",
        title: "Books",
        icon: "book",
    },
    {
        to: "/admin/order",
        title: "Orders",
        icon: "cart",
    },
    {
        to: "/admin/order",
        title: "Category",
        icon: "category",
    },
];

type Props = React.HTMLAttributes<HTMLDivElement>;

function AuthPreview({ className, ...prosp }: Props) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const onLogout = useCallback(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    const onGetProfile = () => {
        const accessToken = localStorage.getItem("access_token");
        profileApi(accessToken!, (err) => {
            if (err) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: err.message,
                });
            } else {
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Get profile success",
                });
            }
        });
    };
    const AdminSection = React.useMemo(() => {
        if (user?.role === ROLE.USER) {
            return <></>;
        }
        return (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>Admin center</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {ADMIN_SECTION_ITEMS.map(({ icon, title, to }) => {
                            const Icon = Icons[icon] || <span />;
                            return (
                                <DropdownMenuItem key={title}>
                                    <Link
                                        to={to}
                                        className="flex justify-center items-center"
                                    >
                                        <Icon
                                            size={12}
                                            className="w-4 h-4 mr-2"
                                        />
                                        <p>{title}</p>
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        );
    }, [user?.role]);

    const renderUserDropdown = React.useMemo(() => {
        if (!user) return <></>;
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="user-profile flex gap-2 items-center justify-start">
                    <Avatar>
                        <AvatarImage src={user.avatar} alt={user.fullName} />
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
                    {AdminSection}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        inset
                        onClick={onLogout}
                        className="text-destructive hover:bg-destructive/20 hover:text-destructive"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }, [AdminSection, onLogout, user]);
    return (
        <div className={(cn(className), "flex")} {...prosp}>
            {user ? (
                <React.Fragment>
                    <ShoppingCart />
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
                    {renderUserDropdown}
                </React.Fragment>
            ) : (
                <Button onClick={onLogin}>Login</Button>
            )}
        </div>
    );
}

export default AuthPreview;

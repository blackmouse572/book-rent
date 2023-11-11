import ShoppingCart from "@/components/cart/cart";
import { Icons } from "@/components/icons";
import Notification from "@/components/notification";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import { Button } from "./ui/button";

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
        to: "/admin/orders",
        title: "Orders",
        icon: "cart",
    },
    {
        to: "/admin/category",
        title: "Category",
        icon: "category",
    },
    {
        to: "/admin/transaction",
        title: "Transaction",
        icon: "transaction",
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
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link to="/profile/orders">
                        <DropdownMenuItem>Order history</DropdownMenuItem>
                    </Link>
                    <Link to="/transaction">
                        <DropdownMenuItem>Transaction</DropdownMenuItem>
                    </Link>
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
                <div className="flex justify-between items-center gap-2">
                    <ShoppingCart />
                    <Notification />
                    {renderUserDropdown}
                </div>
            ) : (
                <Button onClick={onLogin}>Login</Button>
            )}
        </div>
    );
}

export default AuthPreview;

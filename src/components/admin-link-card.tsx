import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    to: string;
    title: string;
    content?: string;
    icon: keyof typeof Icons;
    iconClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;
function AdminLinkCard({
    to,
    iconClassName,
    icon,
    title,
    content,
    className,
    ...props
}: Props) {
    const Icon = Icons[icon] || <></>;
    return (
        <Link to={to}>
            <Card
                {...props}
                className={cn(className, [
                    "relative transition-all duration-100 ease-out overflow-clip",
                    "group",
                    "shadow-none hover:shadow-md ",
                    "border-none",
                    "active:scale-95 active:duration-75 scale-100",
                ])}
            >
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{content}</p>
                </CardContent>
                <div className="absolute top-1/2 -transalte-x-1/2 -translate-y-1/2 -right-12">
                    <Icon className={iconClassName} />
                </div>
            </Card>
        </Link>
    );
}

export default AdminLinkCard;

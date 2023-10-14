import { IBreadcrumb } from "@/components/breadcrumb/type";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    items: Array<IBreadcrumb>;
} & React.HTMLAttributes<HTMLDivElement>;

function Breadcrumb({ items, className, ...props }: Props) {
    delete props.children;
    return (
        <nav
            aria-label="breadcrumb"
            className={cn("flex", className)}
            {...props}
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => {
                    return (
                        <BreadCrumbItem
                            key={item.label}
                            item={item}
                            isLast={index === items.length - 1}
                        />
                    );
                })}
            </ol>
        </nav>
    );
}
type BreadCrumbItemProps = {
    item: IBreadcrumb;
    isLast?: boolean;
} & React.HTMLAttributes<HTMLLIElement>;
function BreadCrumbItem({
    item,
    className,
    isLast,
    ...props
}: BreadCrumbItemProps) {
    delete props.children;
    const Icon = React.useMemo(() => {
        const { icon } = item;
        if (!icon) return null;
        return Icons[icon];
    }, [item]);
    return (
        <li className={cn("inline-flex items-center", className)} {...props}>
            <Link
                to={isLast ? "#" : item.href || "#"}
                className={cn(
                    "inline-block items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white text-ellipsis",
                    {
                        "text-primary": isLast,
                        "hover:text-primary": !isLast,
                    }
                )}
            >
                {Icon && <Icon className="inline-block mr-1" />}
                {item.label}
            </Link>
            {isLast || <Icons.chevronRight className="inline-block ml-1" />}
        </li>
    );
}

export default Breadcrumb;

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default",
    {
        variants: {
            variant: {
                default: "",
                outline: "text-foreground bg-transparent border-foreground",
            },
            isPressable: {
                true: "cursor-pointer active:scale-95 transition-transform",
            },
            colors: {
                primary:
                    "primary group border-transparent bg-primary text-primary-foreground shadow",
                secondary:
                    "secondary group border-transparent bg-secondary text-secondary-foreground",
                destructive:
                    "destructive group border-transparent bg-destructive text-destructive-foreground shadow",
                success:
                    "group success border-transparent bg-success text-success-foreground shadow",
                warning:
                    "group warning border-transparent bg-warning text-warning-foreground shadow",
            },
        },
        defaultVariants: {
            variant: "default",
            isPressable: false,
            colors: "primary",
        },
        compoundVariants: [
            {
                variant: "outline",
                colors: "primary",
                className: "bg-transparent border-primary text-primary",
            },
            {
                variant: "outline",
                colors: "secondary",
                className: "bg-transparent border-secondary text-secondary",
            },
            {
                variant: "outline",
                colors: "destructive",
                className: "bg-transparent border-destructive text-destructive",
            },
            {
                variant: "outline",
                colors: "success",
                className: "bg-transparent border-success text-success",
            },
        ],
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({
    className,
    variant,
    isPressable,
    colors,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(
                badgeVariants({ variant, colors, isPressable }),
                className
            )}
            {...props}
        />
    );
}

export { Badge, badgeVariants };

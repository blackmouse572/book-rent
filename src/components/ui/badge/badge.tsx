import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { badgeVariants } from "./variants";

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

export { Badge };

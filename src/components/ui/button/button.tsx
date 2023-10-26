import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Icons } from "../../icons";
import { buttonVariants } from "./variants";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            colors,
            isLoading = false,
            size,
            children,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                disabled={isLoading ?? false}
                className={cn(
                    buttonVariants({
                        variant,
                        colors,
                        size,
                        className,
                        isLoading,
                    })
                )}
                ref={ref}
                {...props}
            >
                {isLoading && (
                    <Icons.loader className="w-5 h-5 mr-2 animate-spin ease-in-out" />
                )}
                {children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button };
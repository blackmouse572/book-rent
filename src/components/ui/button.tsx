import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all ease-out",
    {
        variants: {
            isLoading: {
                true: "cursor-not-allowed",
            },
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                outline:
                    "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            colors: {
                default: "",
                primary:
                    "text-primary-foreground bg-primary hover:bg-primary/90",
                destructive:
                    "text-destructive-foreground bg-destructive hover:bg-destructive/90",
                success:
                    "text-success-foreground bg-success hover:bg-success/90",
                warning:
                    "text-warning-foreground bg-warning hover:bg-warning/90",
                secondary:
                    "text-secondary-foreground bg-secondary hover:bg-secondary/90",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            colors: "default",
        },
    }
);

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

export { Button, buttonVariants };

import React from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../icons";
import { Button } from "./button/button";

type Props = {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
    onPreviousPage: () => void;
    onNextPage: () => void;
    canNextPage?: boolean;
    canPreviousPage?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function Paginition({
    currentPage,
    totalPage,
    onPageChange,
    onPreviousPage,
    onNextPage,
    canNextPage,
    canPreviousPage,
    className,
    ...props
}: Props) {
    const renderMiddle = React.useMemo(() => {
        //If total page is less than 5, render all page
        if (totalPage <= 5) {
            return Array.from(
                { length: totalPage },
                (_, index) => index + 1
            ).map((page) => (
                <Button
                    key={page}
                    className={cn(
                        "h-8 w-8 rounded-full hover:text-white hover:bg-primary/60",
                        page === currentPage
                            ? "bg-primary text-white "
                            : "bg-white text-primary"
                    )}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ));
        }
        //If current page is less than 3, render 1,2,3,4,5
        if (currentPage <= 3) {
            return Array.from({ length: 5 }, (_, index) => index + 1).map(
                (page) => (
                    <Button
                        key={page}
                        className={cn(
                            "h-8 w-8 rounded-full hover:text-white hover:bg-primary/60",
                            page === currentPage
                                ? "bg-primary text-white"
                                : "bg-white text-primary"
                        )}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                )
            );
        }
        //Else, render first page, current page - 1, current page, current page + 1, last page
        return [
            1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            totalPage,
        ].map((page) => (
            <Button
                key={page}
                className={cn(
                    "h-8 w-8 rounded-full hover:text-white hover:bg-primary/60",
                    page === currentPage
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                )}
                onClick={() => onPageChange(page)}
            >
                {page}
            </Button>
        ));
    }, [currentPage, onPageChange, totalPage]);
    return (
        <div className={cn("space-x-3", className)} {...props}>
            <Button
                variant={"outline"}
                onClick={onPreviousPage}
                disabled={canNextPage}
                className="px-2"
            >
                <Icons.chevronLeft className="h-4 w-4" />
            </Button>
            {renderMiddle}
            <Button
                disabled={canPreviousPage}
                variant={"outline"}
                onClick={onNextPage}
                className="px-2"
            >
                <Icons.chevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Paginition;

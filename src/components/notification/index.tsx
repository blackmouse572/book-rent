import { Icons } from "@/components/icons";
import usePendingOrder from "@/components/notification/usePendingOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

export default function Notification() {
    const { isError, isLoading, data } = usePendingOrder();
    const sortedData = React.useMemo(() => {
        if (isLoading) return [];
        if (isError) return [];
        return data?.data.sort((a, b) => {
            return (
                new Date(b.createdAt!).getTime() -
                new Date(a.createdAt!).getTime()
            );
        });
    }, [data?.data, isError, isLoading]);
    const renderDueDate = React.useCallback((returnDate: Date) => {
        const dueDate = new Date(returnDate);
        const currentDate = new Date();
        const diff = dueDate.getTime() - currentDate.getTime();
        if (diff < 0)
            return (
                <Badge className="text-xs bg-destructive">
                    Overdue {formatDistance(currentDate, dueDate)} ago
                </Badge>
            );
        return (
            <Badge className="text-xs" colors={"success"}>
                Due in {formatDistance(currentDate, dueDate)}
            </Badge>
        );
    }, []);
    const renderData = React.useMemo(() => {
        if (isLoading) return <div>Loading...</div>;
        if (isError) return <div>Error</div>;
        return (
            <>
                <h3>
                    You have&nbsp;
                    <span className="font-medium">
                        {data?._pagination?.total}
                    </span>
                    &nbsp;pending order to return
                </h3>
                <Separator className="mt-2 my-2" />
                <ul className="max-h-[50vh] overflow-y-auto space-y-12">
                    {sortedData.map((order) => (
                        <Link to={`/order/${order._id}`} key={order._id}>
                            <div className="hover:bg-accent px-2.5 py-1.5 rounded-md cursor-pointer space-y-2">
                                <h6 className="text-sm text-slate-500 ">
                                    Order: {order._id}
                                </h6>
                                <div className="flex justify-between">
                                    <p className="text-sm text-slate-600">
                                        {order.cart && order.cart.length} items
                                    </p>
                                    <p className="text-sm font-bold text-slate-600">
                                        D:&nbsp;
                                        {order.deposit}$
                                    </p>
                                    {/* Display is order return date > current date */}
                                    {renderDueDate(order.returnDate)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            </>
        );
    }, [
        data?._pagination?.total,
        isError,
        isLoading,
        renderDueDate,
        sortedData,
    ]);

    const totalPending = React.useMemo(() => {
        if (isLoading) return 0;
        if (isError) return 0;
        return data?._pagination?.total || 0;
    }, [data?._pagination?.total, isError, isLoading]);

    return (
        <Popover>
            <PopoverTrigger>
                <Button className="px-2 relative" variant={"outline"}>
                    <Icons.bell />
                    {totalPending > 0 && (
                        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 text-xs">
                            {totalPending}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>{renderData}</PopoverContent>
        </Popover>
    );
}

import { Icons } from "@/components/icons";
import usePendingOrder from "@/components/notification/usePendingOrder";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Link } from "react-router-dom";

export default function Notification() {
    const { isError, isLoading, data } = usePendingOrder();
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
                <Separator />
                <ul className="max-h-[50vh] overflow-y-auto pt-4">
                    {data?.data.map((order) => (
                        <Link to={`/order/${order._id}`} key={order._id}>
                            <div className="hover:bg-accent px-2.5 py-1.5 rounded-md cursor-pointer">
                                <h6 className="text-xs text-slate-300 ">
                                    Order: {order._id}
                                </h6>
                                <div className="flex justify-between">
                                    <p className="text-sm font-bold text-slate-600">
                                        {order.cart.length} items
                                    </p>
                                    <p className="text-sm font-bold text-slate-600">
                                        {order.totalPrice}$
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            </>
        );
    }, [data?._pagination?.total, data?.data, isError, isLoading]);

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

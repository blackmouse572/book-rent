import { useEffect, useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { IOrder, IOrderCart } from "@/types/order";
import { getAllCartApi } from "@/apis/order_cart";
import { getOrderApi } from "@/apis/order";

function ShoppingCart() {
    const [open, setOpen] = useState(false);
    const maxOrdersToShow = 5;

    const navigate = useNavigate();
    const onViewCart = () => {
        navigate("/viewcart");
    };

    // Fetch mock data using getManyOrders
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        getOrderApi().then((response) => {
            setOrders(response.data);
        });
    }, []);

    const [carts, setCarts] = useState<IOrderCart[]>([]);

    useEffect(() => {
        getAllCartApi().then((response) => {
            setCarts(response.data);
        });
    }, []);

    return (
        <div className="relative z-40">
            <Popover>
                <PopoverTrigger>
                    <button onClick={() => setOpen(!open)}>
                        <span className="sr-only">New orders added</span>
                        <Icons.cart className="h-6 w-6" aria-hidden="true" />
                    </button>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="h-full w-[400px] flex flex-col py-6 bg-white shadow-xl">
                        <div className="px-4 sm:px-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                New orders added
                            </h2>
                        </div>
                        <div className="mt-6 px-4 sm:px-6">
                            <ul className="space-y-4">
                                {carts
                                    .slice(0, maxOrdersToShow)
                                    .map((cart) => (
                                        <li
                                            key={cart._id}
                                            className="flex flex-row space-x-4 py-2 items-center"
                                        >   
                                            {/* <div>
                                                <img src={cart.bookId.image}/>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                {cart.bookId.name}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    ${cart.bookId.price}
                                                </p>
                                            </div> */}
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    x{" "}
                                                    <span className="font-semibold text-gray-900">
                                                        {cart.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                {orders.length > maxOrdersToShow ? (
                                    <li className="flex flex-row space-x-4 py-2 items-center">
                                        <div className="flex-1">
                                            <p>
                                                {" "}
                                                {orders.length -
                                                    maxOrdersToShow}{" "}
                                                order else
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Button
                                                className={
                                                    (buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "px-2 mx-4")
                                                }
                                                onClick={onViewCart}
                                            >
                                                View Cart
                                            </Button>
                                        </div>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ShoppingCart;

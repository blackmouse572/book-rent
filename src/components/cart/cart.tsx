import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useOrderCart } from "@/hooks/useOrderCart"; // Import your context

function ShoppingCart() {
    const [open, setOpen] = useState(false);
    const maxOrdersToShow = 5;

    const navigate = useNavigate();
    const { cartItems } = useOrderCart(); // Get the cart items from your context

    const onViewCart = () => {
        navigate("/viewcart");
    };

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
                                {cartItems ? (
                                    cartItems
                                        .slice(0, maxOrdersToShow)
                                        .map((cart) => (
                                            <li
                                                key={cart.bookId}
                                                className="flex flex-row space-x-4 py-2 items-center"
                                            >
                                                {/* <div>
                                                <img
                                                    src={cart.bookId}
                                                    alt={cart.book.name}
                                                    className="h-12 w-12"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {cart.book.name}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    ${cart.book.rental_price}
                                                </p>
                                            </div> */}
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        <span className="font-semibold text-gray-900">
                                                            {cart.bookId}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        x{" "}
                                                        <span className="font-semibold text-gray-900">
                                                            {cart.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))
                                ) : (
                                    <p>No items in the cart</p>
                                )}

                                <li className="flex flex-row space-x-4 py-2 items-center">
                                    {cartItems &&
                                    cartItems.length > maxOrdersToShow ? (
                                        <div className="flex-1">
                                            <p>
                                                {" "}
                                                {cartItems.length -
                                                    maxOrdersToShow}{" "}
                                                order(s) more
                                            </p>
                                        </div>
                                    ) : null}
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
                            </ul>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ShoppingCart;

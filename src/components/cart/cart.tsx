import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useOrderCart } from "@/hooks/useOrderCart";
import { getBookById } from "@/apis/book"; // Import your getBookById function
import { IBook } from "@/types/book";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

function ShoppingCart() {
    const [open, setOpen] = useState(false);
    const maxOrdersToShow = 5;

    const navigate = useNavigate();
    const { cartItems } = useOrderCart();
    const [bookData, setBookData] = useState<IBook[]>([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const promises = cartItems.map((cart) => getBookById(cart.bookId as string));

            Promise.all(promises)
                .then((bookDataArray) => {
                    setBookData(bookDataArray);
                    // Set the cart item count based on the length of cartItems
                    setCartItemCount(cartItems.length);
                })
                .catch((error) => {
                    console.error("Error fetching book data:", error);
                });
        } else {
            // If cartItems is empty, set cartItemCount to 0
            setCartItemCount(0);
        }
    }, [cartItems]);

    const onViewCart = () => {
        navigate("/viewcart");
    };

    return (
        <div className="relative z-40">
            <HoverCard>
                <HoverCardTrigger>
                    <button onClick={() => setOpen(!open)}>
                        <span className="sr-only">New orders added</span>
                        <Icons.cart size={35} aria-hidden="true" />
                        {cartItemCount > 0 && (
                            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 text-xs">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </HoverCardTrigger>

                <HoverCardContent className="bg-gray-100 rounded-md shadow-lg w-96 mr-10">
                    <div className="h-full w-full flex flex-col py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                New orders added
                            </h2>
                        </div>
                        <div className="mt-6 px-4 sm:px-6">
                            <ul className="space-y-4">
                                {cartItems &&
                                bookData &&
                                bookData.length > 0 ? (
                                    cartItems
                                        .slice(0, maxOrdersToShow)
                                        .map((cart, index) => {
                                            const book = bookData[index];
                                            return (
                                                <li
                                                    key={cart.bookId}
                                                    className="flex flex-row space-x-4 py-2 items-center"
                                                >
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            <span className="font-semibold text-gray-900">
                                                                {book?.name ||
                                                                    "Book Name Not Found"}
                                                            </span>
                                                            <span className="font-semibold text-gray-900">
                                                                {book?.author
                                                                    ?.fullName ||
                                                                    "Author Not Found"}
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
                                            );
                                        })
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
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}

export default ShoppingCart;

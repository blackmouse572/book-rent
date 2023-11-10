import { getBookById } from "@/apis/book"; // Import your getBookById function
import { Icons } from "@/components/icons";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useOrderCart } from "@/hooks/useOrderCart";
import { IBook } from "@/types/book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function ShoppingCart() {
    const [open, setOpen] = useState(false);
    const maxOrdersToShow = 5;

    const navigate = useNavigate();
    const { cartItems } = useOrderCart();
    const [bookData, setBookData] = useState<IBook[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const promises = cartItems.map((cart) =>
                getBookById(cart.bookId as string)
            );

            Promise.all(promises)
                .then((bookDataArray) => {
                    setBookData(bookDataArray);
                    // Tính tổng số lượng sách trong giỏ hàng
                    const quantitySum = cartItems.reduce(
                        (total, cart) => total + cart.quantity,
                        0
                    );
                    setTotalQuantity(quantitySum);
                })
                .catch((error) => {
                    console.error("Error fetching book data:", error);
                });
        } else {
            // Nếu giỏ hàng trống, đặt tổng số lượng sách là 0
            setTotalQuantity(0);
        }
    }, [cartItems]);

    const onViewCart = () => {
        navigate("/viewcart");
    };

    return (
        <div className="relative z-40">
            <HoverCard>
                <HoverCardTrigger>
                    <Button
                        variant={"outline"}
                        onClick={() => setOpen(!open)}
                        className="px-2"
                    >
                        <span className="sr-only">New orders added</span>
                        <Icons.cart />
                        {totalQuantity > 0 && (
                            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 text-xs">
                                {totalQuantity}
                            </span>
                        )}
                    </Button>
                </HoverCardTrigger>

                <HoverCardContent>
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
                                                                     ||
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
                                            className={"px-2 mx-4"}
                                            variant={"secondary"}
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

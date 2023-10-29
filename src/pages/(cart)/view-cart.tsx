import { Context, ContextType } from "@/hooks/useOrder";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import CartTable from "@/components/cart/cart-table";

type Props = React.HTMLAttributes<HTMLDivElement>;

function ViewCart({ className, ...prosp }: Props) {
    const { user } = useAuth();
    const context = useContext(Context) as ContextType;
    const navigate = useNavigate();

    const { orderItems } = context;


    return (
        <div
            className={
                (cn(className), "mx-auto p-8 max-w-screen-xl min-h-[600px]")
            }
            {...prosp}
        >
            <div className="mx-auto p-8 max-w-screen-xl">
                <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
                {/* If the cart is empty */}

                {orderItems?.length && orderItems.length === 0 ? (
                    <div className="cart-empty">
                        <p className="text-gray-600">
                            Your cart is currently empty
                        </p>{" "}
                        <div className="start-shopping mt-4">
                            <Link
                                className="flex items-center text-blue-500"
                                to="/"
                            >
                                <Icons.arrowLeft />
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    // If the cart has products
                    <div>
                        <CartTable />
                        <div className="cart-summary mt-8">
                            <div className="cart-checkout">
                                <div className="flex justify-between">
                                    <div className="continue-shopping mt-4">
                                        <Link
                                            className="flex items-center text-blue-500"
                                            to="/"
                                        >
                                            <Icons.arrowLeft />
                                            <span>Continue Shopping</span>
                                        </Link>
                                    </div>
                                    {user ? (
                                        <Button
                                            className="cart-login bg-blue-500 text-white py-2 px-4 rounded-md mt-4 inline-block mr-20"
                                            onClick={() =>
                                                navigate("/viewcheckout")
                                            }
                                        >
                                            Check out
                                        </Button>
                                    ) : (
                                        <Button
                                            className="cart-login bg-blue-500 text-white py-2 px-4 rounded-md mt-4 inline-block"
                                            onClick={() => navigate("/login")}
                                        >
                                            Login to Check out
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewCart;

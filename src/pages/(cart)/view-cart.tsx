import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useOrderCart } from "@/hooks/useOrderCart";
import CartForm from "@/components/cart/cart-form";

type Props = React.HTMLAttributes<HTMLDivElement>;

function ViewCart({ className, ...props }: Props) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { cartItems } = useOrderCart();

    return (
        <div className={cn(className, "mx-auto p-8 max-w-screen-xl min-h-[600px]")}{...props}>
            <div className="mx-auto p-8 max-w-screen-xl">
                <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
                {cartItems && cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p className="text-gray-600">Your cart is currently empty</p>
                        <div className="start-shopping mt-4">
                            <Link className="flex items-center text-blue-500" to="/">
                                <Icons.arrowLeft />
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <CartForm/>
                        <div className="cart-summary mt-8">
                            <div className="cart-checkout">
                                <div className="flex justify-between">
                                    <div className="continue-shopping mt-4">
                                        <Link className="flex items-center text-blue-500" to="/books">
                                            <Icons.arrowLeft />
                                            <span>Continue Shopping</span>
                                        </Link>
                                    </div>
                                    {user ? (
                                        null
                                    ) : (
                                        <Button className="cart-login bg-blue-500 text-white py-2 px-4 rounded-md mt-4 inline-block" onClick={() => navigate("/login")}>
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
    )
}


export default ViewCart;

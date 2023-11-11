import { getOrderApi } from "@/apis/order(user)/get-order";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useOrderCart } from "@/hooks/useOrderCart";
import { formatPrice } from "@/lib/utils";
import { IOrder } from "@/types/order";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../ui/badge/badge";

const OrderDetailPage = () => {
    const { orderId } = useParams<{ orderId?: string }>();
    const [order, setOrder] = useState<IOrder | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (orderId) {
                    const data = await getOrderApi(orderId);
                    setOrder(data);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [orderId]);

    const formatDate = useCallback((date: string | Date) => {
        const _date = new Date(date);
        return format(_date, "dd/MM/yyyy");
    }, []);

    const { addToCart } = useOrderCart();

    const reOrder = useCallback(() => {
        if (order) {
            order.cart?.forEach((item) => {
                if (item.book?._id) addToCart(item.book?._id);
            });
        }
    }, [order, addToCart]);

    if (!order) {
        return (
            <div className="text-3xl font-bold mb-4 text-center min-h-screen flex items-center justify-center">
                <Icons.loading className="animate-spin ease-out text-primary" />
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "50%",
                borderCollapse: "collapse",
                display: "flex",
            }}
            className="container mx-auto p-10"
        >
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h2 className="text-3xl font-bold mb-4 text-center">
                    Order Detail
                </h2>
                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Field
                            </td>
                            <td className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                Value
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    ID
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {order._id}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Rental Date
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {formatDate(order.rentalDate)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Return Date
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {formatDate(order.returnDate)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Pickup Location
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    {order.pickupLocation}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Return Location
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm  text-center text-gray-500">
                                    {order.returnLocation}
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Total Price
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-red-500">
                                    {formatPrice(order.totalPrice)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Deposit
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center  text-red-500 ">
                                    {formatPrice(order.deposit)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Penalty
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-red-500 ">
                                    {formatPrice(order.penalty)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Penalty Reason
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {order.penaltyReason ? (
                                    <div className="text-sm text-center text-red-500">
                                        {order.penaltyReason}
                                    </div>
                                ) : (
                                    <div className="text-sm text-center text-red-500">
                                        --
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Deposit Type
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    <Badge>{order.depositType}</Badge>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Status
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500">
                                    <Badge>{order.status}</Badge>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ flex: 1, marginLeft: "20px" }}>
                <h2 className="text-3xl font-bold mb-4 text-center">Cart</h2>
                {order.cart ? (
                    <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <tbody className="divide-y divide-gray-200">
                            <tr className="bg-gray-50">
                                <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-between items-center">
                                    <p>Cart</p>
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        onClick={reOrder}
                                    >
                                        <Icons.addRound className="mr-2" />
                                        Reorder
                                    </Button>
                                </td>
                            </tr>
                            {order.cart.map((item, index) => (
                                <tr
                                    key={index}
                                    className="bg-white hover:bg-accent transition-colors"
                                >
                                    <Link to={`/books/${item.book?._id}`}>
                                        <td className="px-6 py-4 whitespace-nowrap flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    Book Name: {item.book?.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Price:{" "}
                                                    {formatPrice(
                                                        item.book?.rental_price
                                                    )}
                                                </div>
                                            </div>
                                            <img
                                                className="h-full w-32"
                                                src={item.book?.image}
                                                alt={item.book?.name}
                                            />
                                        </td>
                                    </Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-2xl font-bold mb-4 text-center">
                        empty cart
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailPage;

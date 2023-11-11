import { getOrderApi } from "@/apis/order(user)/get-order";
import { Icons } from "@/components/icons";
import { IOrder } from "@/types/order";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                                    {order.rentalDate.toString()}
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
                                    {order.returnDate.toString()}
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
                                    {order.totalPrice}
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
                                    {order.deposit}
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
                                    {order.penalty}
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
                                        None
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
                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cart
                                </td>
                            </tr>
                            {order.cart.map((item, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            Book Name: {item.book?.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Price: {item.book?.rental_price}
                                        </div>
                                        <img
                                            src={item.book?.image}
                                            alt={item.book?.name}
                                        />
                                    </td>
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

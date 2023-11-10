import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IOrder } from "@/types/order";
import { getOrderApi } from "@/apis/order/get-order";
// import PayButton from "@/components/checkout/pay-button";
import { Icons } from "@/components/icons";

function ViewCheckout() {
    const { id } = useParams<{ id: string }>();
    const myString: string = id!;

    const [order, setOrder] = useState<IOrder>();

    useEffect(() => {
        getOrderApi(myString)
            .then((order) => {
                if (order) {
                    setOrder(order);
                }
            })
            .catch((error) => {
                console.error("Error fetching order:", error);
            });
    }, [myString]);

    if (!order) {
        return (
            <button
                disabled
                type="button"
                className="m-5 text-white bg-blue-700 align-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
                <Icons.loading />
                Loading...
            </button>
        );
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Order #{order._id}
                </h1>
                <p className="text-base font-medium leading-6 text-gray-600">
                    {order.createdAt
                        ? order.createdAt.toLocaleString()
                        : "No date available"}
                </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Customer’s Cart
                        </p>
                        <table className="min-w-full divide-y divide-gray-200 mt-5">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Book
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.cart.map((cartItem) => (
                                    <tr key={cartItem._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {typeof cartItem.book === "string"
                                                ? cartItem.book
                                                : cartItem.book?.name ||
                                                  "Book not found"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {cartItem.quantity}
                                        </td>
                                        {typeof cartItem.book !== "string" &&
                                            cartItem.book && (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        $
                                                        {cartItem.book.rental_price.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        $
                                                        {(
                                                            cartItem.quantity *
                                                            cartItem.book
                                                                .rental_price
                                                        ).toFixed(2)}
                                                    </td>
                                                </>
                                            )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                Summary
                            </h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Subtotal
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">
                                        {order.totalPrice}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Deposit
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">
                                        {order.deposit?.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">
                                    Total
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-600">
                                    {order.totalPrice && order.deposit
                                        ? 
                                              ((order.totalPrice + order.deposit).toFixed(2))
                                        : ""}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                Delivery Method
                            </h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div className="w-8 h-8">
                                        <img
                                            className="w-full h-full"
                                            alt="logo"
                                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                        />
                                    </div>
                                    <p className="text-lg font-semibold leading-6 text-gray-800">
                                        {order.depositType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl-w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Customer
                    </h3>
                    <div className="flex flex-col md-flex-row xl-flex-col justify-start items-stretch h-full w-full md-space-x-6 lg-space-x-8 xl-space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md-justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img
                                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                                    alt="avatar"
                                />
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                        David Kent
                                    </p>
                                    <p className="text-sm leading-5 text-gray-600">
                                        10 Previous Orders
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center md-justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                        stroke="#1F2937"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3 7L12 13L21 7"
                                        stroke="#1F2937"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                                    david89@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between xl-h-full items-stretch w-full flex-col mt-6 md-mt-0">
                            <div className="flex justify-center md-justify-start xl-flex-col flex-col md-space-x-6 lg-space-x-8 xl-space-x-0 space-y-4 xl-space-y-12 md-space-y-0 md-flex-row items-center md-items-start">
                                <div className="flex justify-center md-justify-start items-center md-items-start flex-col space-y-4 xl-mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md-text-left text-gray-800">
                                        Pick Up Location
                                    </p>
                                    <p className="w-48 lg-w-full xl-w-48 text-center md-text-left text-sm leading-5 text-gray-600">
                                        {order.pickupLocation}
                                    </p>
                                </div>
                                <div className="flex justify-center md-justify-start items-center md-items-start flex-col space-y-4">
                                    <p className="text-base font-semibold leading-4 text-center md-text-left text-gray-800">
                                        Return Location
                                    </p>
                                    <p className="w-48 lg-w-full xl-w-48 text-center md-text-left text-sm leading-5 text-gray-600">
                                        {order.returnLocation}
                                    </p>
                                </div>
                                {/* <div>
                                    <PayButton />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCheckout;

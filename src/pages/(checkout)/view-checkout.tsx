import { getOrderApi } from "@/apis/order(user)/get-order";
import { ENUM_DEPOSIT_TYPE, IOrder } from "@/types/order";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import PayButton from "@/components/checkout/pay-button";
import { getCheckoutUrlApi } from "@/apis/transaction/getCheckoutURL";
import { Icons } from "@/components/icons";
import MetaData from "@/components/metadata";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { format, formatDistance} from "date-fns";

function ViewCheckout() {
    const { id } = useParams<{ id: string }>();
    const myString: string = id!;

    const [order, setOrder] = useState<IOrder>();
    const [checkoutUrl, setCheckoutUrl] = useState<string>("");

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

    const renderDepositType = useMemo(() => {
        if (!order) return null;
        const depositType = order.depositType;
        return (
            <div className="flex justify-center items-center space-x-4 text-slate-800">
                {depositType === "COD" ? (
                    <Icons.truckDelivery className="" />
                ) : (
                    <Icons.creditCard className="" />
                )}
                <p className="text-lg font-semibold leading-6 ">
                    {order.depositType}
                </p>
            </div>
        );
    }, [order]);

    useEffect(() => {
        if (order?.totalPrice && order._id) {
            getCheckoutUrlApi(order?.totalPrice, order?._id)
                .then((res) => {
                    if (res) {
                        console.log(res);
                        setCheckoutUrl(res);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching order:", error);
                });
        }
    }, [order]);

    const checkoutButton = useMemo(() => {
        if (order?.depositType == ENUM_DEPOSIT_TYPE.COD) return null;

        if (checkoutUrl == "") {
            return (
                <Button size={"lg"} className={"px-2 mx-4"} variant={"default"}>
                    <Icons.loading className="animate-spin h-10 w-10 text-secondary mx-auto" />
                </Button>
            );
        }
        return (
            <Link to={checkoutUrl}>
                <Button size={"lg"} className={"px-2 mx-4"} variant={"default"}>
                    Check out
                </Button>
            </Link>
        );
    }, [checkoutUrl, order?.depositType]);

    if (!order) {
        return (
            <div className="container mx-auto min-h-screen">
                <Icons.loading className="animate-spin h-10 w-10 text-primary mx-auto" />
            </div>
        );
    }
    const returnDate = new Date(order.returnDate);
    const rentalDate = new Date(order.rentalDate);
    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <MetaData title="Checkout" />
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Order #{order._id}
                </h1>
                <p className="text-base font-medium leading-6 text-gray-600">
                    {order.createdAt
                        ? order.createdAt.toLocaleString()
                        : "No date available"}
                </p>
                MeSM
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
                                        Rental Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Return Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.cart &&
                                    order.cart.map((cartItem) => (
                                        <tr key={cartItem._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {typeof cartItem.book ===
                                                "string"
                                                    ? cartItem.book
                                                    : cartItem.book?.name ||
                                                      "Book not found"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {cartItem.quantity}
                                            </td>
                                            {typeof cartItem.book !==
                                                "string" &&
                                                cartItem.book && (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {formatPrice(
                                                                cartItem.book
                                                                    .rental_price
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                        {format(new Date(order.rentalDate), "dd/MM/yyyy")}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                        {format(new Date(order.returnDate), "dd/MM/yyyy")}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {formatPrice(
                                                                cartItem.book
                                                                    .rental_price *
                                                                    cartItem.quantity
                                                            )}
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
                                                        <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">
                                    Date rental
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-600">
                                {formatDistance(rentalDate, returnDate)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">
                                    Total
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-600">
                                    {order.totalPrice
                                        ? formatPrice(order.totalPrice) 
                                        : ""}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                Delivery Method
                            </h3>
                            <div className="flex justify-between items-start w-full">
                                {renderDepositType}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl-w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <div className="flex flex-col md-flex-row xl-flex-col justify-between items-stretch h-full w-full md-space-x-6 lg-space-x-8 xl-space-x-0">
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
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {checkoutButton}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCheckout;

import { putOrderStatus } from "@/apis/Ioders(admin)/putstatus";
import { postTransactionApi } from "@/apis/transaction/createTransaction";
import { Icons } from "@/components/icons";
import CheckoutFailed from "@/pages/(checkout)/checkout-fail-page";
import CheckoutSuccess from "@/pages/(checkout)/checkout-success-page";
import { ENUM_ORDER_STATUS } from "@/types/order";
import { TRANSACTION_TYPE_ENUM } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function PenaltyPayment() {
    const [params] = useSearchParams();
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const vnp_OrderInfo = params.get("vnp_OrderInfo") || "";
    const vnp_Amount = params.get("vnp_Amount") || "";
    const vnp_PayDate = params.get("vnp_PayDate") || "";

    const { isLoading, data } = useQuery(
        ["penaltyPayment", vnp_OrderInfo],
        () =>
            postTransactionApi(
                vnp_OrderInfo,
                vnp_Amount,
                TRANSACTION_TYPE_ENUM.PENALTY,
                vnp_PayDate
            ),
        { retry: false }
    );

    useEffect(() => {
        if (data) putOrderStatus(data.order._id, ENUM_ORDER_STATUS.RETURNED);
    }, [isLoading]);
    const success = useMemo(() => {
        if (isLoading) {
            return (
                <div className="text-center">
                    <Icons.loading className="animate-spin h-10 w-10 text-primary mx-auto" />
                    <h1>Saving data... Please wait</h1>
                </div>
            );
        } else {
            if (data) {
                return <CheckoutSuccess />;
            }
            return (
                <h1 className="text-center">
                    Something went wrong while saving data
                </h1>
            );
        }
    }, [isLoading]);
    if (vnp_ResponseCode == "00") {
        return success;
    } else {
        return <CheckoutFailed />;
    }
}

export default PenaltyPayment;

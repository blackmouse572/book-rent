import { postTransactionApi } from "@/apis/transaction/createTransaction";
import { Icons } from "@/components/icons";
import CheckoutFailed from "@/pages/(checkout)/checkout-fail-page";
import CheckoutSuccess from "@/pages/(checkout)/checkout-success-page";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function ViewCheckout() {
    const [params] = useSearchParams();
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const vnp_OrderInfo = params.get("vnp_OrderInfo");
    const vnp_Amount = params.get("vnp_Amount");

    if (vnp_ResponseCode == "00" && vnp_Amount && vnp_OrderInfo) {
        const { isLoading, data } = useQuery(
            ["postTrans"],
            () => postTransactionApi(vnp_OrderInfo, vnp_Amount),
            { retry: false }
        );

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

        return success;
    } else {
        return <CheckoutFailed />;
    }
}

export default ViewCheckout;

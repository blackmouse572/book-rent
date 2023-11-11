import { postTransactionApi } from "@/apis/transaction/createTransaction";
import { Icons } from "@/components/icons";
import CheckoutFailed from "@/pages/(checkout)/checkout-fail-page";
import CheckoutSuccess from "@/pages/(checkout)/checkout-success-page";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import PayButton from "@/components/checkout/pay-button";

function ViewCheckout() {
    const [params] = useSearchParams();
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const vnp_OrderInfo = params.get("vnp_OrderInfo");
    const vnp_Amount = params.get("vnp_Amount");
    const [loading, setLoading] = useState(true);

    const success = useMemo(() => {
        if (loading) {
            return (
                <div className="text-center">
                    <Icons.loading className="animate-spin h-10 w-10 text-primary mx-auto" />
                    <h1>Saving data... Please wait</h1>
                </div>
            );
        } else {
            return <CheckoutSuccess />;
        }
    }, [loading]);

    if (vnp_ResponseCode == "00" && vnp_Amount && vnp_OrderInfo) {
        postTransactionApi(vnp_OrderInfo, vnp_Amount).then(() => {
            setLoading(false);
        });

        return success;
    } else {
        return <CheckoutFailed />;
    }
}

export default ViewCheckout;

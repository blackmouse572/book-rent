import { getAllOrderApi } from "@/apis/order/get-all-order";
import { IResponse } from "@/types";
import { IOrder } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export default function usePendingOrder() {
    return useQuery<IResponse<IOrder[]>>(["pendingOrder"], () => {
        return getAllOrderApi({
            status: "PENDING",
        });
    });
}

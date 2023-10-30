// import PayButton from "../../components/checkout/pay-button";
// import { useContext } from "react";
// import { cn } from "@/lib/utils";
// import React from "react";
// import { Context, ContextType } from "@/hooks/useOrderCart";
// import CheckoutMethod from "@/components/checkout/checkout-method";
// import Shipping from "@/components/cart/shipping-form";
// import CheckoutTable from "@/components/checkout/checkout-table";

// type Props = React.HTMLAttributes<HTMLDivElement>;

// function ViewCheckout({ className, ...prosp }: Props) {
//     const context = useContext(Context) as ContextType;
//     const { cartItems } = context;

//     return (
//         <div
//             className={
//                 (cn(className), "mx-auto p-8 max-w-screen-xl min-h-[700px]")
//             }
//             {...prosp}
//         >
//             <div>
//                 <Shipping />
//             </div>
//             <div>
//                 <CheckoutTable />
//             </div>
//             <div className="subtotal flex justify-between">
//                 <span className="text-2xl font-semibold p-3">Shipping</span>
//                 <span className="amount font-semibold pr-12 mr-12">$123</span>
//             </div>
//             <div className="subtotal flex justify-between">
//                 <span className="text-2xl font-semibold p-3">Total</span>
//                 <span className="amount font-semibold pr-12 mr-12">$123</span>
//             </div>
//             <div>
//                 <CheckoutMethod />
//             </div>
//             <PayButton cartItems={cartItems} />
//         </div>
//     );
// }
// export default ViewCheckout;

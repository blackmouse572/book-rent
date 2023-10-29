// import React, { useState } from "react";

// import CardForm from "../cart/card-form"; // Import the CardForm component

// const CheckoutMethod: React.FC = () => {
//     const [selectedOption, setSelectedOption] = useState(""); // Initialize the selected option state

//     return (
//         <div className="p-4">
//             <div className="border border-gray-200 rounded-lg p-4">
//                 <h2 className="text-lg font-semibold">
//                     Phương thức thanh toán
//                 </h2>
//                 <div className="mt-4">
//                     <div className="flex items-center space-x-4">
//                         <div className="w-80">
//                             <label className="flex items-center space-x-2 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="paymentOption"
//                                     value="creditCard"
//                                     checked={selectedOption === "creditCard"}
//                                     onChange={() =>
//                                         setSelectedOption("creditCard")
//                                     }
//                                     className="form-radio h-5 w-5 text-blue-600"
//                                 />
//                                 <span className="text-gray-800 font-semibold">
//                                     Thẻ Tín dụng/Ghi nợ
//                                 </span>
//                             </label>
//                         </div>
//                         <div className="w-60">
//                             <label className="flex items-center space-x-2 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="paymentOption"
//                                     value="cashOnDelivery"
//                                     checked={
//                                         selectedOption === "cashOnDelivery"
//                                     }
//                                     onChange={() =>
//                                         setSelectedOption("cashOnDelivery")
//                                     }
//                                     className="form-radio h-5 w-5 text-blue-600"
//                                 />
//                                 <span className="text-gray-800 font-semibold">
//                                     Thanh toán khi nhận hàng
//                                 </span>
//                             </label>
//                         </div>
//                     </div>
//                     {selectedOption === "creditCard" && <CardForm />}{" "}
//                     {/* Show CardForm when the "creditCard" option is selected */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutMethod;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CardForm from "@/components/cart/card-form";
import { toast } from "@/components/ui/use-toast";
import { CheckoutFormSchema } from "@/components/checkout/validation-checkout";


export function CheckoutMethod() {
    const form = useForm<z.infer<typeof CheckoutFormSchema>>({
        resolver: zodResolver(CheckoutFormSchema),
    });

    function onSubmit(data: z.infer<typeof CheckoutFormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel> Checkout Method </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="creditCard" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Credit Card
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="cashOnDelivery" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Cash On Delivery
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {form.watch("type") === "creditCard" && <CardForm />}
                        {/* Hiển thị CardForm khi "creditCard" được chọn */}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>  
    );
}

export default CheckoutMethod;

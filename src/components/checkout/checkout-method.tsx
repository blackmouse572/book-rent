import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

    function handleRadioChange(value: string) {
        if (value === "creditCard" || value === "cashOnDelivery") {
            form.setValue("type", value); // Set the form value when a valid radio option is selected
            form.handleSubmit(onSubmit)(); // Submit the form
        }
    }

    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Checkout Method</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => handleRadioChange(value)}
                                            defaultValue={field.value}
                                            className="flex flex-row justify-between"
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
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CheckoutMethod;

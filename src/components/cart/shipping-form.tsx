import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShippingSchema } from "./validation-shipping";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button/button";

type FormData = z.infer<typeof ShippingSchema>;
function ShippingForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(ShippingSchema),
    });
    const [result, setResult] = useState<string>("");
    const onSubmit = async (data: FormData) => {
        // Filter out empty values and join the non-empty values with commas
        const nonEmptyValues = Object.values(data).filter(
            (value) => value !== ""
        );
        const concatenatedValues = nonEmptyValues.join(",");
        setResult(concatenatedValues);
    };

    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Shipping</h2>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 max-w-sm mx-auto w-full"
                    >
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Address </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123 ABC"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row flex flex-row justify-between">
                            <FormField
                                control={form.control}
                                name="ward"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Ward </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ward"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> District </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="district"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700">
                                Confirm address: {result}
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ShippingForm;

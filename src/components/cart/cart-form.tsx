import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartSchema } from "./validation-cart";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { Input } from "../ui/input";
import { Button } from "../ui/button/button";
import CheckoutMethod from "@/components/checkout/checkout-method";
import { toast } from "@/components/ui/use-toast";
import { useOrderCart } from "@/hooks/useOrderCart";

type FormData = z.infer<typeof CartSchema>;
function CartForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(CartSchema),
    });
    const { cartItems } = useOrderCart();
    
    // const [result, setResult] = useState<string>("");
    const onSubmit = async (formData: FormData) => {

        // Combine cartItems and formData into a new object
        const mergedData = {
            ...formData,
            cartItems: cartItems,
        };

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(mergedData, null, 2)}
                    </code>
                </pre>
            ),
        });
        console.log("Form submitted", mergedData);

    };

    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((cart) => (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {cart.bookId}
                                    </TableCell>
                                    <TableCell className="align-center">
                                        {cart.quantity}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <p>No items in the cart</p>
                        )}
                        <TableRow/>
                    </TableBody>
                </Table>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 max-w-sm mx-auto w-full"
                    >
                        <FormField
                            control={form.control}
                            name="addressRental"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Address Rental </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="456 CDF"
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
                            name="addressReturn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Address Return </FormLabel>
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
                                name="dateReturn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Date Return </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="date"
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
                                name="dateRental"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Date Rental </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <CheckoutMethod />
                        <div className="space-y-2">
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                        {/* <div className="mt-4">
                            <p className="text-gray-700">
                                Confirm address: {result}
                            </p>
                        </div> */}
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CartForm;

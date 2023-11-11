import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { CartSchema } from "./validation-cart";

import { getBookById } from "@/apis/book";
import { postOrderApi } from "@/apis/order(user)/post-order";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useOrderCart } from "@/hooks/useOrderCart";
import { cn } from "@/lib/utils";
import { IBook } from "@/types";
import { IOrder } from "@/types/order";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input";

type FormData = z.infer<typeof CartSchema>;

function CartForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(CartSchema),
    });

    const { cartItems, addToCart, decreaseToCart, removeFromCart } =
        useOrderCart();
    const handleAddToCart = (bookId: string) => {
        addToCart(bookId);
    };

    const handleDecreaseToCart = (bookId: string) => {
        decreaseToCart(bookId);
    };

    const handleRemoveFromCart = (bookId: string) => {
        removeFromCart(bookId);
    };

    const [bookData, setBookData] = useState<IBook[]>([]);
    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const promises = cartItems
                .filter((cart) => typeof cart.bookId === "string")
                .map((cart) => getBookById(cart.bookId as string)); // Cast to string

            Promise.all(promises)
                .then((bookDataArray) => {
                    setBookData(bookDataArray);
                })
                .catch((error) => {
                    console.error("Error fetching book data:", error);
                });
        }
    }, [cartItems]);

    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const mergedData: IOrder = {
            ...data,
            cart: cartItems,
        };
        await postOrderApi(mergedData)
            .then((order: IOrder) => {
                if (order && order._id) {
                    console.log("Order ID:", order._id);
                    navigate(`/order/${order._id}`);
                } else {
                    toast({
                        title: "Invalid order response",
                        description: "No order ID in the response.",
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: "Error submitting order",
                    description: error.message,
                });
            });
    };

    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems && bookData && bookData.length > 0 ? (
                            cartItems.map((cart, index) => (
                                <TableRow key={bookData[index]._id}>
                                    <TableCell className="font-medium">
                                        {bookData[index].name}
                                    </TableCell>
                                    <TableCell className="align-center">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                handleDecreaseToCart(
                                                    bookData[index]
                                                        ._id as string
                                                )
                                            }
                                        >
                                            -
                                        </Button>{" "}
                                        {cart.quantity}{" "}
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                handleAddToCart(
                                                    bookData[index]
                                                        ._id as string
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {bookData[index].rental_price *
                                            cart.quantity}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Button
                                            onClick={() =>
                                                handleRemoveFromCart(
                                                    bookData[index]
                                                        ._id as string
                                                )
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <p>No items in the cart</p>
                        )}
                        <TableRow />
                    </TableBody>
                </Table>

                <Separator />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 border border-gray-200 rounded-lg p-4 m-4 max-w-sm mx-auto w-full"
                    >
                        <FormField
                            control={form.control}
                            name="pickupLocation"
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
                            name="returnLocation"
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

                        <div className="flex flex-row justify-between">
                            <FormField
                                control={form.control}
                                name="rentalDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Rental Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[175px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a rental
                                                                date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="returnDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Return Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[175px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a rental
                                                                date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="depositType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deposit Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) =>
                                                form.setValue(
                                                    "depositType",
                                                    value as "ONLINE" | "COD"
                                                )
                                            }
                                            defaultValue={field.value}
                                            className="flex flex-row justify-between"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="ONLINE" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Online
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="COD" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Cash On Delivery
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getOrderApi } from "@/apis/Ioders(admin)/Ioders";
import { penaltyOrderApi } from "@/apis/Ioders(admin)/penalty-order";
import { penaltyOrderSchema } from "@/components/historyOrder(admin)/validateOrder";
import { toast } from "@/components/ui/use-toast";
import { IOrder } from "@/types/order";
import { useEffect, useState } from "react";

type FormData = z.infer<typeof penaltyOrderSchema>;

export function PenaltyOrder({ orderId }: { orderId: string }) {
    const form = useForm<FormData>({
        resolver: zodResolver(penaltyOrderSchema),
    });
    const [order, setOrder] = useState<IOrder | undefined>(undefined);

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        getOrderApi(orderId)
            .then((order: IOrder) => {
                if (order && order._id) {
                    setOpen(false);
                    setOrder(order);
                } else {
                    setOpen(false);
                    toast({
                        title: "Invalid order response",
                        description: "No order ID in the response.",
                    });
                }
            })
            .catch((error) => {
                setOpen(false);
                toast({
                    title: "Error order detail",
                    description: error.message,
                });
            });
    }, [orderId]);

    const onSubmit = (data: FormData) => {
        penaltyOrderApi(orderId, data.penalty, data.penaltyReason)
            .then((order: IOrder) => {
                if (order && order._id) {
                    toast({
                        title: "Save successful",
                        description: "penalty order successfully",
                    });
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

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Penalty</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Penalty Order</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 border border-gray-200 rounded-lg p-4 m-4 max-w-sm mx-auto w-full"
                            >
                                <div className="flex flex-row flex flex-row justify-between">
                                    <FormField
                                        control={form.control}
                                        name="penalty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel> Penalty </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={order?.penalty?.toString()}
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
                                        name="penaltyReason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Penalty reason
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={
                                                            order?.penaltyReason
                                                        }
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
                                    <DialogFooter className="sm:justify-start">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

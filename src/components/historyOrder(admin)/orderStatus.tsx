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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getOrderApi } from "@/apis/Ioders(admin)/Ioders";
import { putOrderStatus } from "@/apis/Ioders(admin)/putstatus";
import { upDateOrderStatusSchema } from "@/components/historyOrder(admin)/schemaStatus";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query";
import { ENUM_ORDER_STATUS, IOrder } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type FormData = z.infer<typeof upDateOrderStatusSchema>;
type Props = {
    orderId: string;
    onStatusChange?: () => void;
    defaultStatus?: ENUM_ORDER_STATUS;
};
export function UpdateStatusOrder({ orderId, defaultStatus }: Props) {
    const form = useForm<FormData>({
        resolver: zodResolver(upDateOrderStatusSchema),
        defaultValues: {
            status: defaultStatus,
        },
    });

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: ENUM_ORDER_STATUS;
        }) => putOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllOrderApi", "admin"],
            });
        },
    });

    const [, setOrder] = useState<IOrder | undefined>(undefined);

    useEffect(() => {
        getOrderApi(orderId)
            .then((order: IOrder) => {
                if (order && order._id) {
                    setOrder(order);
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: "Error category detail",
                    description: error.message,
                });
            });
    }, [orderId]);

    const [open, setOpen] = useState(false);

    const onSubmit = async (data: FormData) => {
        const { status } = data; // Trích xuất giá trị status từ đối tượng data
        const statusString = status.toString();
        await mutateAsync({
            id: orderId,
            status: statusString as ENUM_ORDER_STATUS,
        })
            .then((order: IOrder) => {
                if (order && order._id) {
                    toast({
                        title: "Order status updated",
                        description: (
                            <p>
                                Order status of <b>{order._id}</b> has been
                                updated to <b>{order.status}</b>.
                            </p>
                        ),
                        variant: "success",
                    });
                } else {
                    toast({
                        title: "Invalid order response",
                        description: "No order ID in the response.",
                        variant: "destructive",
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
                <Button variant="outline" size={"sm"}>
                    Update Status
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 border border-gray-200 rounded-lg p-4 m-4 mx-auto w-full max-w-lg "
                            >
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl className="flex-col">
                                                <RadioGroup
                                                    disabled={isLoading}
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "status",
                                                            value as
                                                                | "REJECTED"
                                                                | "RETURNED"
                                                                | "CANCELLED"
                                                                | "PENDING"
                                                        )
                                                    }
                                                    defaultValue={field.value}
                                                    className=""
                                                >
                                                    <div>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="REJECTED" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                REJECTED
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                    <div>
                                                        <FormItem className=" space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="RETURNED" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                RETURNED
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                    <div>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="CANCELLED" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                CANCELLED
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                    <div>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="PENDING" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                PENDING
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <DialogFooter className="sm:justify-start">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            isLoading={isLoading}
                                        >
                                            Submit
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

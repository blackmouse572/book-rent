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

import { IOrder } from "@/apis/Ioders(admin)/Ioders";
import { penaltyOrderApi } from "@/apis/Ioders(admin)/penalty-order";
import { penaltyOrderSchema } from "@/components/historyOrder(admin)/validateOrder";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type FormData = z.infer<typeof penaltyOrderSchema>;
type Props = {
    order: IOrder;
    isDisable: boolean;
};
export function PenaltyOrder({ order, isDisable }: Props) {
    const form = useForm<FormData>({
        resolver: zodResolver(penaltyOrderSchema),
    });

    const [open, setOpen] = useState<boolean>(false);

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: ({
            id,
            penalty,
            penaltyReason,
        }: {
            id: string;
            penalty: number;
            penaltyReason: string;
        }) => penaltyOrderApi(id, penalty, penaltyReason),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllBookApi", "admin"],
            });
        },
    });

    const onSubmit = async (data: FormData) => {
        if (order._id)
            await mutateAsync({
                id: order._id,
                penalty: data.penalty,
                penaltyReason: data.penaltyReason,
            })
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
                <Button disabled={isDisable} size={"sm"} variant="outline">
                    Penalty
                </Button>
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
                                                <Textarea
                                                    placeholder={
                                                        order?.penaltyReason
                                                    }
                                                    maxLength={500}
                                                    {...field}
                                                />
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
                                            {order?.penalty &&
                                            order.penaltyReason
                                                ? "Update and resend email"
                                                : "Save and send email"}
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

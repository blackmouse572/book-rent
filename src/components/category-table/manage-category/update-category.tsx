import { Button } from "@/components/ui/button";
import {
    Dialog,
    //   DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categogyUpdateSchema } from "@/components/category-table/manage-category/validation-category";
import { ICategory } from "@/types/category";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateCategoryApi } from "@/apis/category/update-category";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { getCategoryApi } from "@/apis/category";

type FormData = z.infer<typeof categogyUpdateSchema>;

export function UpdateCategory({ categoryId }: { categoryId: string }) {
    const form = useForm<FormData>({
        resolver: zodResolver(categogyUpdateSchema),
    });

    const navigate = useNavigate();

    const [category, setCategory] = useState<ICategory | undefined>(undefined);

    useEffect(() => {
        getCategoryApi(categoryId)
            .then((category: ICategory) => {
                if (category && category._id) {
                    setCategory(category);
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
    }, [categoryId]);

    const onSubmit = async (data: FormData) => {
        await updateCategoryApi(categoryId, data)
            .then((category: ICategory) => {
                if (category && category._id) {
                    toast({
                        title: "Successful!!",
                        description: "Update Categogy Success",
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
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Name </FormLabel>
                                            <FormControl>
                                                <Input
                                                    defaultValue={
                                                        category?.name
                                                    }
                                                    placeholder={category?.name}
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Description </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        category?.description
                                                    }
                                                    defaultValue={
                                                        category?.description
                                                    }
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
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "status",
                                                            value as
                                                                | "ENABLE"
                                                                | "DISABLE"
                                                        )
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-row justify-between"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="ENABLE" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Enable
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="DISABLE" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Disable
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
                                    <DialogFooter className="sm:justify-start">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Submit
                                        </Button>
                                        <DialogClose>Close</DialogClose>
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

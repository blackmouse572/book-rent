import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateCategoryApi } from "@/apis/category/update-category";
import { getCategoryApi } from "@/apis/category";
import { ICategory } from "@/types/category";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogClose } from "@radix-ui/react-dialog";
import { categogyUpdateSchema } from "@/components/category-table/manage-category/validation-category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormData = z.infer<typeof categogyUpdateSchema>;

export function UpdateCategory({ categoryId }: { categoryId: string }) {
    const queryClient = useQueryClient();
    const [category, setCategory] = useState<ICategory | undefined>(undefined);

    const form = useForm<FormData>({
        resolver: zodResolver(categogyUpdateSchema),
        defaultValues: {
            name: category?.name || "",
            description: category?.description || "",
            status: category?.status || "ENABLE",
        },
    });

    const { mutate: updateCategory } = useMutation(
        (updatedData: Partial<ICategory>) => updateCategoryApi(categoryId, updatedData as ICategory),
        {
            onSuccess: (updatedCategory) => {
                toast({
                    title: "Successful!!",
                    description: "Update Category Success",
                });
                setCategory(updatedCategory);
                queryClient.invalidateQueries(); // You might need to replace "category" with the actual query key
            },
            onError: () => {
                toast({
                    title: "Error updating category",
                });
            },
        }
    );

    const fetchDataAndUpdateForm = async () => {
        try {
            const fetchedCategory = await getCategoryApi(categoryId);
            if (fetchedCategory && fetchedCategory._id) {
                setCategory(fetchedCategory);
                // Reset the form with the fetched data
                form.reset(fetchedCategory);
            } else {
                toast({
                    title: "Invalid category response",
                    description: "No category ID in the response.",
                });
            }
        } catch (error) {
            toast({
                title: "Error category detail",
            });
        }
    };

    useEffect(() => {
        fetchDataAndUpdateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    const onSubmit = (data: FormData) => {
        // Only include fields that have changed
        const updatedData: Partial<ICategory> = {};

        if (data.name !== category?.name) {
            updatedData.name = data.name!;
        }

        if (data.description !== category?.description) {
            updatedData.description = data.description!;
        }

        if (data.status !== category?.status) {
            updatedData.status = data.status!;
        }

        updateCategory(updatedData);
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
                                                <Input defaultValue={category?.name} {...field} />
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
                                                <Input defaultValue={category?.description} {...field} />
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
                                                    onValueChange={(value) => form.setValue("status", value as "ENABLE" | "DISABLE")}
                                                    defaultValue={field.value}
                                                    className="flex flex-row justify-between"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="ENABLE" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Enable</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="DISABLE" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Disable</FormLabel>
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
                                        <Button type="submit" className="w-full">
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

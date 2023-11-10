import { Button } from "@/components/ui/button";
import {
    Dialog,
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
import { categogySchema } from "@/components/category-table/manage-category/validation-category";
import { ICategory } from "@/types/category";
import { postCategoryApi } from "@/apis/category";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "@radix-ui/react-dialog";

type FormData = z.infer<typeof categogySchema>;

export function CreateCategory() {
    const form = useForm<FormData>({
        resolver: zodResolver(categogySchema),
    });

    const queryClient = useQueryClient();

    const { mutate: addCategory } = useMutation(
        (data: FormData) => postCategoryApi(data),
        {
            onSuccess: (category: ICategory) => {
                if (category && category._id) {
                    console.log("Category ID:", category._id);
                    toast({
                        title: "Successful!!!",
                        description: "Add Category Success!",
                    });
                    // Invalidate and refetch the category list query
                    queryClient.invalidateQueries();
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    });
                }
            },
            onError: (error: Error) => {
                toast({
                    title: "Error submitting category",
                    description: error.message,
                });
            },
        }
    );

    const onSubmit = (data: FormData) => {
        addCategory(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
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
                                                    placeholder="Anime"
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
                                                    placeholder="Wibu Kingdom"
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

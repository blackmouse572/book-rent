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
import { toast } from "@/components/ui/use-toast";
import { createBookSchema } from "@/components/book-table/manage-book/validation-book";
import { postBookApi } from "@/apis/book/post-book";
import { IBook } from "@/types/book";

import { ICategory } from "@/types/category";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/apis/category";
import { DataTableFacetedFilter } from "@/components/ui/data-table-facet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "@radix-ui/react-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

type FormData = z.infer<typeof createBookSchema>;

export function CreateBook() {
    const form = useForm<FormData>({
        resolver: zodResolver(createBookSchema),
    });

    const queryClient = useQueryClient();

    const onSubmit = async (data: FormData) => {
        const genres = data.genres.split(",").map((genre) => genre.trim());
        // Trigger the mutation
        const bookData = {
            ...(data as FormData),
            genres: JSON.stringify(genres),
            image: data.image,
        };
        addBookMutation.mutate(bookData);
    };
    const addBookMutation = useMutation(
        (data: FormData) => postBookApi(data, data.image),
        {
            onSuccess: (book: IBook) => {
                if (book && book._id) {
                    console.log("Category ID:", book._id);
                    toast({
                        title: "Successful!!!",
                        description: "Add book Success!",
                    });
                    // Invalidate and refetch the category list query
                    queryClient.invalidateQueries();
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    });
                }
                // Additional logic after successful mutation
            },
            onError: (error: Error) => {
                toast({
                    title: "Error submitting book",
                    description: error.message,
                });
            },
        }
    );

    const [category, setCategory] = useState<ICategory[]>();

    useEffect(() => {
        getAllCategories()
            .then((category: ICategory[]) => {
                if (category) {
                    setCategory(category);
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    });
                }
            })
            .catch((error: Error) => {
                toast({
                    title: "Error category detail",
                    description: error.message,
                });
            });
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add Book</DialogTitle>
                </DialogHeader>
                <ScrollArea
                    type={"always"}
                    className=" max-h-[500px] flex items-center space-x-2"
                >
                    <div className="grid flex-1 gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 border border-gray-200 rounded-lg p-2 m-2 max-w-md mx-auto w-full"
                            >
                                <div className=" flex flex-row">
                                    <div className="ml-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Name{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Happy Poster"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <FormField
                                            control={form.control}
                                            name="author"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Author{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="author"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className=" flex flex-row">
                                    <div className="ml-2">
                                        <FormField
                                            control={form.control}
                                            name="rental_price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        rental_price{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="123"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Description{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Description"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="keyword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Keyword </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="keyword"
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
                                    name="category"
                                    render={() => (
                                        <DataTableFacetedFilter
                                            title="Category"
                                            onOptionsChange={(options) => {
                                                form.setValue(
                                                    "category",
                                                    JSON.stringify(
                                                        options.map(
                                                            (o) => o.value
                                                        )
                                                    )
                                                );
                                            }}
                                            options={
                                                category?.map((c) => ({
                                                    label: c.name,
                                                    value: c._id || "",
                                                })) || []
                                            }
                                        />
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="genres"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Genres </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Genres (comma-separated)"
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
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        className="hover:bg-accent"
                                                        value="NEW"
                                                    >
                                                        NEW
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="hover:bg-accent"
                                                        value="LIKE_NEW"
                                                    >
                                                        LIKE_NEW
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="hover:bg-accent"
                                                        value="DAMAGED"
                                                    >
                                                        DAMAGED
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="statusDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {" "}
                                                Status Description{" "}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Status description"
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
                                    name="image"
                                    render={({ field }) => (
                                        // Assuming `field` is provided by react-hook-form
                                        <FormItem>
                                            <FormLabel> Image </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .files?.[0] ||
                                                                null
                                                        )
                                                    }
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
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

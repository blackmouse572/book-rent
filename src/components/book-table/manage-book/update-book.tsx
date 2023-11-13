import { getBookById } from "@/apis/book";
import { updateBookApi } from "@/apis/book/update-book";
import { getAllCategories } from "@/apis/category";
import { updateBookSchema } from "@/components/book-table/manage-book/update-validation-book";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/ui/data-table-facet";
import {
    Dialog,
    DialogContent,
    DialogFooter,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { IBook } from "@/types/book";
import { ICategory } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof updateBookSchema>;

export function UpdateBook({ bookId }: { bookId: string }) {
    const [category, setCategory] = useState<ICategory[]>();
    const [book, setBook] = useState<IBook>();

    const form = useForm<FormData>({
        resolver: zodResolver(updateBookSchema),
    });
    const onOpenDialog = (open: boolean) => {
        if (open) {
            getBookById(bookId)
                .then((bookData: IBook) => {
                    if (bookData) {
                        setBook(bookData);
                    } else {
                        toast({
                            title: "Invalid book response",
                            description: "Can not fecth book data",
                        });
                    }
                })
                .catch(() => {
                    toast({
                        title: "Invalid book response",
                        description: "Can not fecth book data",
                    });
                });
        } else {
            setBook(undefined);
        }
    };

    const onSubmit = async (data: FormData) => {
        const genres = data.genres.split(",").map((genre) => genre.trim());

        const bookData = {
            ...(data as FormData),
            genres: JSON.stringify(genres),
            image: data.image,
        };

        await updateBookApi(bookId, bookData, bookData.image)
            .then((book: IBook) => {
                if (book && book._id) {
                    toast({
                        title: "Success",
                        description: "Added Book",
                    });
                } else {
                    toast({
                        title: "Invalid book response",
                        description: "No book ID in the response.",
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: "Error submitting book",
                    description: error.message,
                });
            });
    };

    const updateForm = useMemo(() => {
        if (!book) {
            return <></>;
        }
        form.setValue("name", book.name);
        form.setValue("author", book.author);
        form.setValue(
            "category",
            JSON.stringify(book.category?.map((c) => c._id))
        );
        form.setValue("description", book.description);
        form.setValue(
            "genres",
            JSON.stringify(book.genres).replace(/[\[\"\]]/g, "")
        );
        form.setValue("keyword", book.keyword);
        form.setValue("rental_price", book.rental_price);
        form.setValue("status", book.status);
        form.setValue("statusDescription", book.statusDescription);

        return (
            <ScrollArea
                type="always"
                className="max-h-[500px] flex items-center space-x-2"
            >
                <div className=" grid flex-1 gap-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 max-w-md mx-auto w-full"
                        >
                            <div className=" flex flex-row justify-between">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Name </FormLabel>
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
                                <FormField
                                    control={form.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Author </FormLabel>
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
                            <FormField
                                control={form.control}
                                name="rental_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> rental_price </FormLabel>
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

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Description </FormLabel>
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
                                                    options.map((o) => o.value)
                                                )
                                            );
                                        }}
                                        options={
                                            category?.map((c) => ({
                                                label: c.name,
                                                value: c._id || "",
                                            })) || []
                                        }
                                        defaultOptions={book?.category?.map(
                                            (c) => ({
                                                label: c.name,
                                                value: c._id || "",
                                            })
                                        )}
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
                                        <FormLabel> Status </FormLabel>
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
                                                        e.target.files?.[0] ||
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
                                    <Button type="submit" className="w-full">
                                        Submit
                                    </Button>
                                    <DialogClose>Close</DialogClose>
                                </DialogFooter>
                            </div>
                        </form>
                    </Form>
                </div>
            </ScrollArea>
        );
    }, [book]);

    useEffect(() => {
        getAllCategories()
            .then((categoryData: ICategory[]) => {
                if (categoryData) {
                    setCategory(categoryData);
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    });
                }
            })
            .catch((error: Error) => {
                toast({
                    title: "Error fetching category detail",
                    description: error.message,
                });
            });
    }, []);

    return (
        <Dialog onOpenChange={(open) => onOpenDialog(open)}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">{updateForm}</DialogContent>
        </Dialog>
    );
}

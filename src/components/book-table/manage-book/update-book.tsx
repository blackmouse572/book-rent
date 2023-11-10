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
import { IBook } from "@/types/book";
import { updateBookApi } from "@/apis/book/update-book";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateBookSchema } from "@/components/book-table/manage-book/update-validation-book";

type FormData = z.infer<typeof updateBookSchema>;

export function UpdateBook({bookId} : {bookId: string}) {
    const form = useForm<FormData>({
        resolver: zodResolver(updateBookSchema),
    });

    const onSubmit = async (data: FormData) => {

        const bookData = {
            ...(data as FormData),
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
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
                                            {/* <FormMessage /> */}
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
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                </div>
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
                                            {/* <FormMessage /> */}
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
                                            {/* <FormMessage /> */}
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
                                                    value as "ENABLE" | "DISABLE"
                                                )
                                            }
                                            defaultValue={field.value}
                                            className="flex flex-row"
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
                                    {/* <FormMessage /> */}
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
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Categories </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Categories (comma-separated)"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            {/* <FormMessage /> */}
                                        </FormItem>
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
                                            {/* <FormMessage /> */}
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
                                            {/* <FormMessage /> */}
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

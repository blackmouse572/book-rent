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
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type FormData = z.infer<typeof createBookSchema>;

export function CreateBook() {
    const form = useForm<FormData>({
        resolver: zodResolver(createBookSchema),
    });

    const onSubmit = async (data: FormData) => {
        const bookData = {
            ...(data as FormData),
            image: data.image,
        };

        await postBookApi(bookData, bookData.image)
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

    
    const [category, setCategory] = useState<ICategory[]>();

    useEffect(() => {
        getAllCategories()
            .then((category: ICategory[]) => {
                if(category) {
                    setCategory(category);
                } else {
                    toast({
                        title: "Invalid category response",
                        description: "No category ID in the response.",
                    })
                }
            })
            .catch((error:Error) => {
                toast({
                    title: "Error category detail",
                    description: error.message,
                });
            });
});
const frameworks = category?.map((category) => ({
    value: category?._id,
    label: category?.name,
})) || [];

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add Book</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
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
  render={({ field }) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((item) => item.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  field.onChange(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
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

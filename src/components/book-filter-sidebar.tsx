import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

type Props = {
    onFilterChange?: (filter: Record<string, unknown>) => void;
};

const FilterSchema = z.object({
    search: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    review: z.number({}).gt(0).lt(6).optional(),
});

type FilterForm = z.infer<typeof FilterSchema>;

function BookFilterSidebar({ onFilterChange }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { control, handleSubmit, reset, setValue } = useForm<FilterForm>({
        resolver: zodResolver(FilterSchema),
    });

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const author = searchParams.get("author") || "";
        const genre = searchParams.get("genre") || "";
        const review = Number(searchParams.get("review")) || undefined;

        setValue("search", search);
        setValue("author", author);
        setValue("genre", genre);
        setValue("review", review);
    }, [searchParams, setValue]);

    const onSubmit = React.useCallback(
        (data: FilterForm) => {
            const searchParams = new URLSearchParams();

            data.search && searchParams.set("search", data.search);
            data.author && searchParams.set("author", data.author);
            data.genre && searchParams.set("genre", data.genre);
            data.review && searchParams.set("review", data.review.toString());

            setSearchParams(searchParams, { replace: true });

            if (onFilterChange) {
                onFilterChange(data);
            }
        },
        [onFilterChange, setSearchParams]
    );

    const onClear = React.useCallback(() => {
        reset();
    }, [reset]);

    return (
        <React.Fragment key={"sidebar.filter"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div aria-label="search">
                    <Label htmlFor="search">Find book</Label>
                    <Input
                        id="search"
                        {...control.register("search")}
                        className="bg-card"
                    />
                </div>
                <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        {...control.register("author")}
                        className="bg-card"
                    />
                </div>
                <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                        id="genre"
                        {...control.register("genre")}
                        className="bg-card"
                    />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="review" className="flex">
                        Review
                    </Label>
                </div>
                <div className="flex justify-between">
                    <Button type="submit">Find now</Button>
                    <Button
                        variant={"ghost"}
                        type="button"
                        onClick={onClear}
                        className=""
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default BookFilterSidebar;

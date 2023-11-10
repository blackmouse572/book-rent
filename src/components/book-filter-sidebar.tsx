import { Button } from "@/components/ui/button";
import { Combobox, IComboboxData } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAllCategory from "@/pages/(book)/useGetManyCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

type Props = {
    onFilterChange?: (filter: Record<string, unknown>) => void;
    totalBooks?: number;
    onRentAll?: () => void;
};

const FilterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    genres: z.string().optional(),
});

type FilterForm = z.infer<typeof FilterSchema>;

function BookFilterSidebar({ onFilterChange, totalBooks, onRentAll }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { control, handleSubmit, reset, setValue, watch } =
        useForm<FilterForm>({
            resolver: zodResolver(FilterSchema),
        });

    const { isLoading: isCategoryLoading, data: categories } =
        useGetAllCategory();

    const categoriesCombobox = useMemo(() => {
        if (!categories) return [];
        else
            return categories.map<IComboboxData>((ct) => ({
                label: ct.name,
                value: ct._id,
            }));
    }, [categories]);

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const genres = searchParams.get("genres") || "";
        const category = searchParams.get("category") || "";

        setValue("search", search);
        setValue("category", category);
        setValue("genres", genres);

        control.handleSubmit((data) => {
            onFilterChange && onFilterChange(data);
        })();
    }, [searchParams, setValue]);

    const onSubmit = React.useCallback(
        (data: FilterForm) => {
            const searchParams = new URLSearchParams();

            data.search && searchParams.set("search", data.search);
            data.category && searchParams.set("category", data.category);
            data.genres && searchParams.set("genres", data.genres);

            setSearchParams(searchParams, { replace: true });

            if (onFilterChange) {
                onFilterChange(data);
            }
        },
        [onFilterChange, setSearchParams]
    );
    const [clearFlag, setClearFlag] = useState(false);
    const onClear = React.useCallback(() => {
        reset();
        setClearFlag((prev) => !prev);
    }, [reset]);

    const rentAll = React.useCallback(() => {
        onRentAll && onRentAll();
    }, [onRentAll]);

    return (
        <React.Fragment key={"sidebar.filter"}>
            {totalBooks && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        {totalBooks} books found
                    </p>
                    <Button onClick={rentAll} size={"sm"} variant={"outline"}>
                        Rent all
                    </Button>
                </div>
            )}
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
                    <Label htmlFor="category">Category</Label>
                    <Combobox
                        isLoading={isCategoryLoading}
                        data={categoriesCombobox}
                        defaultValue={watch("category")}
                        onSelection={(category) =>
                            setValue("category", category)
                        }
                        clear={clearFlag}
                    />
                </div>
                <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                        id="genre"
                        {...control.register("genres")}
                        className="bg-card"
                    />
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

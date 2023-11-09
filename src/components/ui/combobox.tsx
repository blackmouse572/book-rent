import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";

export interface IComboboxData {
    value: string;
    label: string;
}

interface ChildProps {
    data: IComboboxData[];
    isLoading: boolean;
    onSelection: (value: string) => void;
    defaultValue?: string;
    clear: boolean;
}

export const Combobox: React.FC<ChildProps> = ({
    data,
    isLoading,
    onSelection,
    defaultValue,
    clear,
}) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    console.log(defaultValue);
    React.useEffect(() => {
        setValue(defaultValue || "");
    }, [data, defaultValue, clear]);

    const renderitem = React.useMemo(() => {
        if (isLoading)
            return (
                <Icons.loading className="text-primary mx-auto animate-spin ease-out" />
            );
        return data.map((framework) => (
            <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelection(currentValue);
                }}
            >
                <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                />
                {framework.label}
            </CommandItem>
        ));
    }, [isLoading, data, value, onSelection]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[100%] bg-card", {
                        "justify-between": value,
                        "justify-end": !value,
                    })}
                >
                    {value
                        ? data.find((framework) => framework.value === value)
                              ?.label
                        : ""}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex p-0">
                <Command>
                    <CommandInput />
                    <CommandGroup defaultValue={value}>
                        {renderitem}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

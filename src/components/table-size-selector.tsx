import { SelectProps } from "@radix-ui/react-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
type Props = {
    defaultSize?: number;
    sizes?: number[];
    onChange?: (size: number) => void;
} & Omit<SelectProps, "defaultValue" | "onValueChange" | "onChange">;

function TableSizeSelector({
    defaultSize = 10,
    sizes = [10, 25, 50, 100],
    onChange,
    ...props
}: Props) {
    return (
        <Select
            {...props}
            defaultValue={defaultSize.toString()}
            onValueChange={(value) => {
                const changeValue = parseInt(value.toString());
                onChange?.(changeValue);
            }}
        >
            <SelectTrigger className="">
                <SelectValue placeholder={defaultSize} />
            </SelectTrigger>
            <SelectContent>
                {sizes.map((size) => (
                    <SelectItem value={size.toString()} key={size}>
                        {size}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default TableSizeSelector;

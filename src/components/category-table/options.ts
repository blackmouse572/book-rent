import { STATUS } from "@/types/category";
import { DataTableFacetedFilterOption } from "../ui/data-table-facet";

export const TABLE_CATEGORY_STATUS_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(STATUS).map((status) => ({
        label: status,
        value: status,
    }));

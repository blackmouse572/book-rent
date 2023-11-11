import { STATUS } from "@/types/book";
import { DataTableFacetedFilterOption } from "../ui/data-table-facet";

export const TABLE_BOOK_STATUS_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(STATUS).map((status) => ({
        label: status,
        value: status,
    }));

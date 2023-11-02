import { STATUS }  from "@/types/order";
import { DataTableFacetedFilterOption } from "../ui/data-table-facet";

export const TABLE_STATUS_ORDER_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(STATUS).map((status) => ({
        label: status,
        value: status,
    }));

    
export const TABLE_DEPOSITTYPE_ORDER_FACET_OPTIONS: DataTableFacetedFilterOption[] =
Object.values(STATUS).map((status) => ({
    label: status,
    value: status,
}));


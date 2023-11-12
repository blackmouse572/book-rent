import { ENUM_DEPOSIT_TYPE, ENUM_ORDER_STATUS } from "@/types/order";
import { DataTableFacetedFilterOption } from "../ui/data-table-facet";

export const TABLE_STATUS_ORDER_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(ENUM_ORDER_STATUS).map((status) => ({
        label: status,
        value: status,
    }));

export const TABLE_DEPOSITTYPE_ORDER_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(ENUM_DEPOSIT_TYPE).map((status) => ({
        label: status,
        value: status,
    }));

import { ROLE } from "../../types";
import { DataTableFacetedFilterOption } from "../ui/data-table-facet";

export const TABLE_USER_ROLE_FACET_OPTIONS: DataTableFacetedFilterOption[] =
    Object.values(ROLE).map((role) => ({
        label: role,
        value: role,
    }));

import { Icons } from "@/components/icons";

export interface IBreadcrumb {
    key: string;
    label: string;
    icon?: keyof typeof Icons;
    href?: string;
    isDisabled?: boolean;
}

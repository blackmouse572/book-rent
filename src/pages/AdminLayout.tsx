import { ADMIN_SECTION_ITEMS } from "@/components/AuthPreview";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { useAuth } from "@/hooks/useAuth";
import { ROLE } from "@/types";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const breadcrumbs = React.useMemo<IBreadcrumb[]>(() => {
        const paths = ADMIN_SECTION_ITEMS.filter(
            (item) =>
                item.to === pathname && item.to !== ADMIN_SECTION_ITEMS[0].to
        )[0];

        const items: IBreadcrumb[] = [
            {
                key: "base",
                label: ADMIN_SECTION_ITEMS[0].title,
                href: ADMIN_SECTION_ITEMS[0].to,
                icon: ADMIN_SECTION_ITEMS[0].icon,
            },
        ];

        if (paths) {
            items.push({
                key: "base-items",
                label: paths.title,
                href: paths.to,
                icon: paths.icon,
            });
        }

        return items.length > 1 ? items : [];
    }, [pathname]);
    if (user?.role === ROLE.USER) return <Navigate to={"/"} />;
    return (
        <div className="container mx-auto pb-8">
            <Breadcrumb items={breadcrumbs} className="my-4" />
            <Outlet />
        </div>
    );
}

export default AdminLayout;

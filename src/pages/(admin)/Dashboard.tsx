import { ADMIN_SECTION_ITEMS } from "@/components/AuthPreview";
import AdminLinkCard from "@/components/admin-link-card";
import { cn } from "@/lib/utils";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
    const renderCardsItem = React.useMemo(() => {
        return ADMIN_SECTION_ITEMS.map(({ icon, title, to }, index) => {
            return (
                <AdminLinkCard
                    key={title}
                    className={cn({
                        "bg-success/20 text-success": index === 0,
                        "bg-violet-500/20 text-violet-500": index === 1,
                        "bg-warning/20 text-warning": index === 2,
                        "bg-destructive/20 text-destructive": index === 3,
                        "bg-cyan-500/20 text-cyan-500": index === 4,
                        "bg-zinc-500/20 text-zinc-500": index === 5,
                    })}
                    to={to}
                    icon={icon}
                    title={`${title} ${index == 1 ? "" : "Manager"}`}
                    iconClassName={cn("w-24 h-24", {
                        "text-success/20": index === 0,
                        "text-violet-500/20": index === 1,
                        "text-warning/20": index === 2,
                        "text-destructive/20": index === 3,
                        "text-cyan-500/20": index === 4,
                    })}
                />
            );
        });
    }, []);
    return (
        <div className="container mx-auto min-h-screen ">
            <div className="grid grid-cols-3 mt-6 gap-4">{renderCardsItem}</div>
            <Outlet />
        </div>
    );
};
export default DashboardPage;

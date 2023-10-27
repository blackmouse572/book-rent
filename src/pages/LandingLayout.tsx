import React from "react";
import AutoScrollToTop from "../components/auto-scroll-top";
import Header from "@/components/header/Header";

interface LandingLayoutProps {
    children?: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <main>
            <AutoScrollToTop />
            {children}
        </main>
    );
};

export default LandingLayout;

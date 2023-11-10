import React from "react";
import AutoScrollToTop from "../components/auto-scroll-top";

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

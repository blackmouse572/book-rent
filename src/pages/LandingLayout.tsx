import React from "react";
import AutoScrollToTop from "../components/auto-scroll-top";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

interface LandingLayoutProps {
    children?: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <main>
            <AutoScrollToTop />
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default LandingLayout;

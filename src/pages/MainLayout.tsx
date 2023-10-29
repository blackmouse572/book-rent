import AutoScrollToTop from "@/components/auto-scroll-top";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/nav";
import MetaData from "@/components/metadata";
import { Outlet } from "react-router-dom";
import TailwindIndicator from "../components/Tailwind-Indicator";
import Header from "@/components/header/Header";

function MainLayout() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <MetaData title="Homepage" />
            <NavBar />
            <Header />
            <AutoScrollToTop />
            <TailwindIndicator />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;

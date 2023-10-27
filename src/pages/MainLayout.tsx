import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/nav";
import MetaData from "@/components/metadata";
import { Outlet } from "react-router-dom";
import TailwindIndicator from "../components/Tailwind-Indicator";

function MainLayout() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <MetaData title="Homepage" />
          
            <NavBar />
            <TailwindIndicator />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;

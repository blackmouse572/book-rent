import FeartureCategory from "@/components/landing/feature-category";
import BestSeller from "../components/landing/best-seller.tsx";
import Carousel from "../components/landing/carousel.tsx";
import FeatureBook from "../components/landing/feature-book.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import LandingLayout from "@/pages/LandingLayout.tsx";
function Landing() {
    return (
        <LandingLayout>
            <>
                <Carousel />
                <Separator />
                <FeatureBook />
                <Separator />
                <FeartureCategory />
                <Separator />
                <BestSeller />
            </>
        </LandingLayout>
    );
}
export default Landing;

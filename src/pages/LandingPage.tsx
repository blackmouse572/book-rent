import BestSeller from "../components/landing/best-seller.tsx";
import FeatureBook from "../components/landing/feature-book.tsx";
import FeartureCategory from "@/components/landing/feature-category";
import Carousel from "../components/landing/carousel.tsx";
import LandingLayout from "@/pages/LandingLayout.tsx";
function Landing() {
    return (
        <LandingLayout>
            <Carousel />
            <FeatureBook />
            <FeartureCategory />
            <BestSeller />
        </LandingLayout>
    );
}
export default Landing;

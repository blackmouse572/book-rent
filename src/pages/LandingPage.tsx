import FeartureCategory from "@/components/landing/feature-category";
import BestSeller from "../components/landing/best-seller.tsx";
import Carousel from "../components/landing/carousel.tsx";
import FeatureBook from "../components/landing/feature-book.tsx";
function Landing() {
    return (
        <>
            <Carousel />
            <FeatureBook />
            <FeartureCategory />
            <BestSeller />
        </>
    );
}
export default Landing;

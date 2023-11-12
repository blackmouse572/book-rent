import FeartureCategory from "@/components/landing/feature-category";
import BestSeller from "../components/landing/best-seller.tsx";
import Carousel from "../components/landing/carousel.tsx";
import FeatureBook from "../components/landing/feature-book.tsx";
import { Separator } from "@/components/ui/separator.tsx";
function Landing() {
    return (
        <>
            <Carousel />
            <Separator />
            <FeatureBook />
            <Separator />
            <FeartureCategory />
            <Separator />
            <BestSeller />
        </>
    );
}
export default Landing;

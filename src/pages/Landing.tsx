import AutoScrollToTop from '../components/layout/auto-scroll-top.tsx';
import BestSeller  from '../components/landing/best-seller';
import FeatureBook from '../components/landing//feature-book';
import FeartureCategory from '@/components/landing/feature-category';
import Carousel from '../components/landing/carousel';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
function Landing() {
  return (
    <div>
      <AutoScrollToTop />
      <Header />
      <Carousel />
      <FeatureBook />
      <FeartureCategory />
      <BestSeller />
      <Footer />
    </div>
  );
}
export default Landing;
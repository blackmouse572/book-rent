
import BestSeller  from './best-seller';
import FeatureBook from './feature-book';
import FeartureCategory from '@/components/landing/feature-category';
import Carousel from './carousel';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
export const Landing = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <FeatureBook />
      <FeartureCategory />
      <BestSeller />
      <Footer/>
    </div>
  );
};

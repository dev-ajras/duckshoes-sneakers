import CarouselBanner from '../components/CarouselBanner';
import CarouselFeatured from '../components/CarouselFeatured';

function Home() {
  return (
    <>
      <CarouselBanner/>
      <CarouselFeatured title={'Releases'} from={20} to={30} />
      <CarouselFeatured title={'Trending'} from={30} to={40} />
    </>
  );
}

export default Home;

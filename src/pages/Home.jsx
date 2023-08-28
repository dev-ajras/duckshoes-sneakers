import CarouselBanner from '../components/CarouselBanner';
import CarouselFeatured from '../components/CarouselFeatured';
import Info from '../components/Info';

function Home() {
  return (
    <section className="bg-body">
      <CarouselBanner />
      <CarouselFeatured title={'Releases'} from={0} to={10} />
      <CarouselFeatured title={'Trending'} from={0} to={10} />
      <Info />
    </section>
  );
}

export default Home;

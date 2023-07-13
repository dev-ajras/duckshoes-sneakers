import CarouselBanner from '../components/CarouselBanner';
import CarouselFeatured from '../components/CarouselFeatured';

function Home() {
  return (
    <section className="bg-body">
      <CarouselBanner />
      <CarouselFeatured title={'Releases'} from={20} to={30} />
      <CarouselFeatured title={'Trending'} from={30} to={40} />
    </section>
  );
}

export default Home;

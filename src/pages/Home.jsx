import CarouselBanner from '../components/CarouselBanner';
import CarouselFeatured from '../components/CarouselFeatured';
import Info from '../components/Info';

function Home() {
  return (
    <section className='bg-body'>
      <CarouselBanner />
      <CarouselFeatured title={'Lanzamientos'} />
      <CarouselFeatured title={'Tendencias'} />
      <Info />
    </section>
  );
}

export default Home;

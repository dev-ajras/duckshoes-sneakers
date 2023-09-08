import Banner from "../components/Banner";
import CarouselFeatured from "../components/CarouselFeatured";
import Info from "../components/Info";

function Home() {
  return (
    <section className="bg-body">
      <Banner />
      <CarouselFeatured title={"Lanzamientos"} />
      <CarouselFeatured title={"Tendencias"} />
      <Info />
    </section>
  );
}

export default Home;

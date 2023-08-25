import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import banner1 from '/assets/banners/sneakerBanner1.webp';
import banner2 from '/assets/banners/sneakerBanner2.webp';
import banner3 from '/assets/banners/sneakerBanner3.webp';

const autoplayOptions = {
  delay: 3000,
  stopOnInteraction: false,
};

function CarouselBanner() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  return (
    <section className="flex justify-center">
      <div className="flex items-center gap-10 max-w-6xl w-full m-3 sm:m-5">
        <article className="w-1/3">
          <h2 className="text-6xl font-medium mb-3">Gestionamos tu pedido!</h2>
          <p className="text-xl font-medium">
            Simplicamos y optimizamos tu proceso de compra
          </p>
          <button className="bg-primaryDark p-3 rounded text-white mt-5 font-normal">
            Realizar pedido
          </button>
        </article>
        <article className="overflow-hidden w-2/3" ref={emblaRef}>
          <div className="flex items-center">
            <div className="flex-[0_0_100%] mx-3 sm:mx-5 drop-shadow-md">
              <img
                className="rounded-md object-fill"
                src={banner1}
                alt={banner1}
              />
            </div>
            <div className="flex-[0_0_100%] mx-3 sm:mx-5 drop-shadow-md">
              <img
                className="rounded-md object-fill"
                src={banner2}
                alt={banner2}
              />
            </div>
            <div className="flex-[0_0_100%] mx-3 sm:mx-5 drop-shadow-md">
              <img
                className="rounded-md object-fill"
                src={banner3}
                alt={banner3}
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default CarouselBanner;

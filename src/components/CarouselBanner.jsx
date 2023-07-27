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
    <div className="flex justify-center">
      <div
        className="overflow-hidden max-w-6xl w-full m-3 sm:m-5"
        ref={emblaRef}
      >
        <div className="flex">
          <div className="flex-[0_0_100%] my-2 mx-1 sm:m-3 md:mx-3 md:my-6 ">
            <img className="rounded-md" src={banner1} alt={banner1} />
          </div>
          <div className="flex-[0_0_100%] my-2 mx-1 sm:m-3 md:mx-3 md:my-6">
            <img className="rounded-md" src={banner2} alt={banner2} />
          </div>
          <div className="flex-[0_0_100%] my-2 mx-1 sm:m-3 md:mx-3 md:my-6">
            <img className="rounded-md" src={banner3} alt={banner3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import banner1 from '/assets/banners/banner-1.webp';
import banner2 from '/assets/banners/banner-2.webp';
import banner3 from '/assets/banners/banner-3.webp';

const autoplayOptions = {
  delay: 3000,
  stopOnInteraction: false,
};

function CarouselBanner() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex max-w-7xl mx-auto">
        <div className="flex-[0_0_80%] py-2 px-1 sm:p-3 sm:flex-[0_0_70%] md:flex-[0_0_55%] md:px-3 md:py-6">
          <img
            className="rounded-md object-contain"
            src={banner1}
            alt={banner1}
          />
        </div>
        <div className="flex-[0_0_80%] py-2 px-1 sm:p-3 sm:flex-[0_0_70%] md:flex-[0_0_55%] md:px-3 md:py-6">
          <img
            className="rounded-md object-contain"
            src={banner2}
            alt={banner2}
          />
        </div>
        <div className="flex-[0_0_80%] py-2 px-1 sm:p-3 sm:flex-[0_0_70%] md:flex-[0_0_55%] md:px-3 md:py-6">
          <img
            className="rounded-md object-contain"
            src={banner3}
            alt={banner3}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;

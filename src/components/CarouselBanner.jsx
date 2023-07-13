import useEmblaCarousel from 'embla-carousel-react';

import banner1 from '/assets/banners/banner-1.webp';
import banner2 from '/assets/banners/banner-2.webp';
import banner3 from '/assets/banners/banner-3.webp';

function CarouselBanner() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className="flex-[0_0_100%] p-3">
          <img className="rounded-md" src={banner1} alt={banner1} />
        </div>
        <div className="flex-[0_0_100%] p-3">
          <img className="rounded-md" src={banner2} alt={banner2} />
        </div>
        <div className="flex-[0_0_100%] p-3">
          <img className="rounded-md" src={banner3} alt={banner3} />
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;

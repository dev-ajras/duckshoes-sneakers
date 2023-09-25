import React from "react";
import { Link } from "react-router-dom";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import cartBanner from "/assets/banners/cartBanner.webp";
import ordersBanner from "/assets/banners/ordersBanner.webp";
import orderBanner from "/assets/banners/orderBanner.webp";

function Banner() {
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
  };

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  return (
    <section className="flex justify-center items-center bg-background">
      <div className="md:flex md:gap-10 lg:gap-32 items-center max-w-6xl m-5 mb-10 sm:m-10 md:m-16 md:mb-20">
        <article className="flex flex-col items-center md:items-start gap-3 md:gap-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white">
            Gestionamos tu pedido
          </h2>
          <p
            className="text-white text-lg text-center sm:text-xl lg:text-2xl md:text-start opacity-80"
            style={{ textWrap: "balance" }}
          >
            Simplificamos y optimizamos tu proceso de compra.
          </p>
          <Link
            to="/products"
            className="md:hover:bg-primaryExtraDark md:transition-colors md:font-normal text-white mt-3 py-2 px-3 md:px-6 md:py-4 md:text-lg bg-primaryDark rounded"
          >
            Empezar
          </Link>
        </article>
        <article className="mt-8 md:mt-0 placeholderBanner bg-contain rounded-md">
          <div className="flex justify-center">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                <div className="flex-[0_0_100%] mx-3 sm:mx-5">
                  <img
                    className="rounded-md object-fill"
                    src={cartBanner}
                    alt={cartBanner}
                  />
                </div>
                <div className="flex-[0_0_100%] mx-3 sm:mx-5">
                  <img
                    className="rounded-md object-fill"
                    src={ordersBanner}
                    alt={ordersBanner}
                  />
                </div>
                <div className="flex-[0_0_100%] mx-3 sm:mx-5">
                  <img
                    className="rounded-md object-fill"
                    src={orderBanner}
                    alt={orderBanner}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Banner;

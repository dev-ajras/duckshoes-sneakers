import { useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AppContext } from "../context/AppProvider";
import { Link } from "react-router-dom";

import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

function CarouselFeatured({ from, to, title }) {
  const { favoritesHandler, favorites, products } = useContext(AppContext);
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const handleFavorite = (e, productId) => {
    e.preventDefault();
    favoritesHandler(productId);
  };

  function compare(a, b) {
    return a - b;
  }

  return (
    <article className="flex justify-center w-full">
      <div className="max-w-6xl m-3 sm:m-5 overflow-hidden pb-3">
        <h3 className="mb-3 font-medium text-xl sm:text-2xl sm:mb-5">
          {title}
        </h3>
        <div ref={emblaRef}>
          <div className="flex gap-3 sm:gap-5">
            {products.slice(from, to).map((product) => {
              const isFavorite = favorites.some((fav) => fav === product.id);
              return (
                <Link
                  to={`/products/${product.name}?color=${product.color}&size=${
                    product.size_range && product.size_range.sort(compare)[2]
                  }`}
                  className="w-full flex-[0_0_40%] p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_21%]"
                  key={product.id}
                >
                  <img
                    className="w-full"
                    src={product.grid_picture_url}
                    alt={product.name}
                  />
                  <h3 className="line-clamp-2 h-12 sm:text-lg sm:h-14">
                    {product.name}
                  </h3>
                  <div className="flex justify-between mt-1 items-center text-xl sm:text-2xl sm:mt-3">
                    <strong>${product.retail_price_cents / 100}</strong>
                    <button
                      className="absolute top-4 right-4 sm:top-5 sm:right-5"
                      onClick={(e) => handleFavorite(e, product.id)}
                    >
                      {isFavorite ? (
                        <AiFillHeart className="fill-red-500 w-6 h-6 sm:w-10 sm:h-8" />
                      ) : (
                        <MdFavoriteBorder className="w-6 h-6 opacity-70 sm:w-10 sm:h-8" />
                      )}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CarouselFeatured;

import { useContext } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AppContext } from '../context/AppProvider';
import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

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
    <section>
      <h3 className="mt-2 mx-3 font-bold text-xl">{title}</h3>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 m-3 ">
          {products.slice(from, to).map((product) => {
            const isFavorite = favorites.some((fav) => fav === product.id);
            return (
              <Link
                to={`/products/${product.name}?color=${product.color}&size=${
                  product.size_range && product.size_range.sort(compare)[2]
                }`}
                className="w-full flex-[0_0_43%] p-3 drop-shadow-md bg-white rounded-md relative"
                key={product.id}
              >
                <img
                  className="w-full"
                  src={product.grid_picture_url}
                  alt={product.name}
                />
                <h3 className="line-clamp-2 h-12">{product.name}</h3>
                <div className="flex justify-between mt-1 items-center text-xl">
                  <strong>${product.retail_price_cents / 100}</strong>
                  <button
                    className="absolute top-4 right-4"
                    onClick={(e) => handleFavorite(e, product.id)}
                  >
                    {isFavorite ? (
                      <AiFillHeart className="fill-red-500 scale-125" />
                    ) : (
                      <MdFavoriteBorder className="scale-125 opacity-70" />
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CarouselFeatured;

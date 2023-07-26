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
    <article className='max-w-6xl mx-auto'>
      <h3 className='mt-2 mx-3 font-bold text-xl sm:text-3xl sm:mt-3 sm:mx-5'>
        {title}
      </h3>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-3 m-3 sm:gap-5 sm:m-5'>
          {products.slice(from, to).map((product) => {
            const isFavorite = favorites.some((fav) => fav === product.id);
            return (
              <Link
                to={`/products/${product.name}?color=${product.color}&size=${
                  product.size_range && product.size_range.sort(compare)[2]
                }`}
                className='w-full flex-[0_0_43%] p-3 drop-shadow-md bg-white rounded-md relative sm:p-5 sm:flex-[0_0_37%] md:flex-[0_0_21%]'
                key={product.id}
              >
                <img
                  className='w-full'
                  src={product.grid_picture_url}
                  alt={product.name}
                />
                <h3 className='line-clamp-2 h-12 sm:text-2xl sm:h-16'>
                  {product.name}
                </h3>
                <div className='flex justify-between mt-1 items-center text-xl sm:text-3xl sm:mt-3'>
                  <strong>${product.retail_price_cents / 100}</strong>
                  <button
                    className='absolute top-4 right-4 sm:top-5 sm:right-5'
                    onClick={(e) => handleFavorite(e, product.id)}
                  >
                    {isFavorite ? (
                      <AiFillHeart className='fill-red-500 w-6 h-6 sm:w-10 sm:h-8' />
                    ) : (
                      <MdFavoriteBorder className='w-6 h-6 opacity-70 sm:w-10 sm:h-8' />
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default CarouselFeatured;

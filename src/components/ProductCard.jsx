import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

function ProductCard({ product, favoritesCard }) {
  const { favoritesHandler, favorites } = useContext(AppContext);

  const isFavorite = favorites.some(
    (fav) => fav.id === product.id && fav.color === product.color
  );

  const handleFavorite = (e, product) => {
    e.preventDefault();
    favoritesHandler(product);
  };

  return (
    <Link
      to={`/products/${product.sku}/${product.id}?color=${product.color}`}
      className='shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow rounded-md bg-white p-3 relative sm:p-5 md:p-5 min-h-[229px] sm:min-h-[265px] md:min-h-[338px] lg:min-h-[385px]'
    >
      <div className='flex flex-col w-full h-full'>
        {favoritesCard && product.images ? (
          <img
            className='object-contain px-3 py-5 md:px-5 md:py-10 h-full'
            src={product.images[product.color][0]}
            alt={product.sku}
          />
        ) : (
          <img
            className='object-contain px-3 py-5 md:px-5 md:py-10 h-full'
            src={product.image}
            alt={product.sku}
          />
        )}

        <h3 className='line-clamp-1 h-8 sm:text-lg'>{product.sku}</h3>
        <div className='mt-1 md:mt-2 text-xl'>
          <strong className='sm:text-2xl'>
            ${parseInt(product.price).toLocaleString('es-ES')}
          </strong>
        </div>
        <button
          className='absolute top-4 right-4  md:top-5 md:right-5'
          onClick={(e) => handleFavorite(e, product)}
        >
          {isFavorite ? (
            <AiFillHeart className='fill-red-500 w-5 h-5 sm:w-7 sm:h-7' />
          ) : (
            <MdFavoriteBorder className='w-5 h-5 opacity-60 sm:w-7 sm:h-7' />
          )}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;

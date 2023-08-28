import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

function ProductCard({ product }) {
  const { favoritesHandler, favorites } = useContext(AppContext);

  const isFavorite = favorites.some((fav) => fav === product.id);

  function compare(a, b) {
    return a - b;
  }

  const handleFavorite = (e, productId) => {
    e.preventDefault();
    favoritesHandler(productId);
  };

  return (
    <Link
      to={`/products/${product.sku}?color=${product.color}&size=${
        product.size_range && product.size_range.sort(compare)[2]
      }`}
      className="shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow rounded-md bg-white p-3 relative sm:p-5"
    >
      <div className="flex items-center h-64">
        <img src={product.image} alt={product.sku} />
      </div>
      <div className="flex justify-between mt-1 items-center text-xl">
        <strong className="sm:text-2xl sm:mb-2">${product.price}</strong>
      </div>
      <h3 className="line-clamp-2 h-8 sm:text-lg sm:h-10">{product.sku}</h3>
      <button
        className="absolute top-4 right-4 sm:top-9 sm:right-9 md:top-5 md:right-5"
        onClick={(e) => handleFavorite(e, product.id)}
      >
        {isFavorite ? (
          <AiFillHeart className="fill-red-500 w-5 h-5 sm:w-7 sm:h-7" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5 opacity-70 sm:w-7 sm:h-7" />
        )}
      </button>
    </Link>
  );
}

export default ProductCard;

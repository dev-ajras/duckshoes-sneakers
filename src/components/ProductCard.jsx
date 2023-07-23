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
      to={`/products/${product.name}?color=${product.color}&size=${
        product.size_range && product.size_range.sort(compare)[2]
      }`}
      className="drop-shadow-md rounded-md bg-white p-3 relative sm:p-5"
    >
      <img src={product.grid_picture_url} alt={product.nickname} />
      <div className="flex justify-between mt-1 items-center text-xl">
        <strong className="sm:text-3xl sm:mb-2">
          ${product.retail_price_cents / 100}
        </strong>
      </div>
      <h3 className="line-clamp-2 h-12 sm:text-2xl sm:h-16">{product.name}</h3>
      <button
        className="absolute top-4 right-4 sm:top-9 sm:right-9"
        onClick={(e) => handleFavorite(e, product.id)}
      >
        {isFavorite ? (
          <AiFillHeart className="fill-red-500 w-6 h-6 sm:w-9 sm:h-9" />
        ) : (
          <MdFavoriteBorder className="w-6 h-6 opacity-70 sm:w-9 sm:h-9" />
        )}
      </button>
    </Link>
  );
}

export default ProductCard;

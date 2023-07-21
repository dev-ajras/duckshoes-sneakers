import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

function ProductCard({ product }) {
  const { favoritesHandler, favorites } = useContext(AppContext);

  const isFavorite = favorites.some((fav) => fav === product.id);

  function compare(a, b) {
    return a - b
  }

  return (
    <Link
      to={`/products/${product.name}?color=${product.color}&size=${product.size_range && product.size_range.sort(compare)[2]}`}
      className="drop-shadow-md rounded-md bg-white p-2 relative"
    >
      <img src={product.grid_picture_url} alt={product.name} />
      <div className="flex justify-between mt-1 items-center text-xl">
        <strong>${product.retail_price_cents / 100}</strong>
        <button
          className="absolute top-4 right-4"
          onClick={() => favoritesHandler(product.id)}
        >
          {isFavorite ? (
            <AiFillHeart className="fill-red-500 scale-125" />
          ) : (
            <MdFavoriteBorder className="scale-125 opacity-70" />
          )}
        </button>
      </div>
      <h3 className="line-clamp-2 h-12">{product.name}</h3>
    </Link>
  );
}

export default ProductCard;

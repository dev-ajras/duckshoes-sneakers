import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

function ProductCard({ product }) {
  const { favoritesHandler, favorites } = useContext(AppContext);

  const isFavorite = favorites.some((fav) => fav === product.id);

  const handleFavorite = (e, productId) => {
    e.preventDefault();
    favoritesHandler(productId);
  };
  return (
    <Link
      to={`/products/${product.name}?color=${product.color}`}
      className="drop-shadow-md rounded-md bg-white p-2"
    >
      <img src={product.grid_picture_url} alt={product.name} />
      <div className="flex justify-between mt-1 items-center text-xl">
        <strong>${product.retail_price_cents / 100}</strong>
        <div className="flex gap-2 items-center">
          <button
            className="absolute top-5 right-5"
            onClick={(e) => handleFavorite(e, product.id)}
          >
            {isFavorite ? (
              <AiFillHeart className="fill-red-500" />
            ) : (
              <MdFavoriteBorder />
            )}
          </button>
        </div>
      </div>
      <h3 className="line-clamp-2 h-12">{product.name}</h3>
    </Link>
  );
}

export default ProductCard;

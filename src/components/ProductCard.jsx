import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function ProductCard({ product }) {
  const { favoriteAdd, favorites } = useContext(AppContext);

  const result = favorites.some((fav) => fav.id === product.id);
  console.log(result);

  const handleFavorite = (productFav) => {
    favoriteAdd(productFav);
  };
  return (
    <Link
      to={`/products/${product.name}`}
      className="drop-shadow-md rounded-md bg-white p-2"
    >
      <img src={product.grid_picture_url} alt={product.name} />
      <h3 className="line-clamp-2 h-12">{product.name}</h3>
      <div className="flex justify-between mt-1 items-center">
        <strong>${product.retail_price_cents / 100}</strong>
        <div className="flex gap-2">
          <button onClick={() => handleFavorite(product)}>
            {result ? (
              <AiFillHeart className="fill-red-500" />
            ) : (
              <MdFavoriteBorder />
            )}
          </button>
          <button>
            {' '}
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

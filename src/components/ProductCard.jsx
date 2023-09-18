import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

import { Link } from "react-router-dom";

import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

function ProductCard({ product }) {
  const { favoritesHandler, favorites } = useContext(AppContext);

  const isFavorite = favorites.some((fav) => fav === product.id);

  const handleFavorite = (e, productId) => {
    e.preventDefault();
    favoritesHandler(productId);
  };

  console.log(product);

  return (
    <Link
      to={`/products/${product.sku}/${product.id}?color=${product.color}`}
      className="shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow rounded-md bg-white p-3 relative sm:p-5 md:p-5"
    >
      <div className="flex flex-col w-full h-full">
        <img
          className="object-contain px-5 h-full"
          src={product.image}
          alt={product.sku}
        />
        <h3 className="line-clamp-1 h-8 sm:text-lg">{product.sku}</h3>
        <div className="mt-1 md:mt-2 text-xl">
          <strong className="sm:text-2xl">
            ${parseInt(product.price).toLocaleString("es-ES")}
          </strong>
        </div>
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
      </div>
    </Link>
  );
}

export default ProductCard;

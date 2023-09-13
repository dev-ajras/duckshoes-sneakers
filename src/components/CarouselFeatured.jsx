import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { Link } from "react-router-dom";
import SkeletonCarouselFeatured from "./Skeletons/SkeletonCarouselFeatured";

import axios from "axios";

import useEmblaCarousel from "embla-carousel-react";
import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

function CarouselFeatured({ title }) {
  const { favoritesHandler, favorites } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}products?page=1&pageSize=10`
        );
        console.log(response);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fecthProducts();
  }, []);

  const handleFavorite = (e, productId) => {
    e.preventDefault();
    favoritesHandler(productId);
  };

  return (
    <article className="flex justify-center w-full">
      <div className="max-w-6xl m-3 sm:m-5 overflow-hidden pb-3">
        <h3 className="mb-3 font-medium text-xl sm:text-2xl sm:mb-5">
          {title}
        </h3>
        <div ref={emblaRef}>
          <div className="flex gap-3 sm:gap-5">
            {loading ? (
              <SkeletonCarouselFeatured />
            ) : products.length > 0 ? (
              products.map((product) => {
                const isFavorite = favorites.some((fav) => fav === product.id);
                return (
                  <Link
                    to={`/products/${product.sku}/${product.id}?color=${product.color}`}
                    className="w-full flex-[0_0_40%] p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_21%]"
                    key={product.id}
                  >
                    <div className="flex flex-col w-full h-full">
                      <img
                        className="object-contain p-3 md:p-5 h-full"
                        src={product.image}
                        alt={product.sku}
                      />
                      <h3 className="line-clamp-1 h-8 sm:text-lg">
                        {product.sku}
                      </h3>
                      <div className=" flex mt-1 items-center text-xl sm:text-2xl sm:mt-3">
                        <strong>
                          ${parseInt(product.price).toLocaleString("es-ES")}
                        </strong>
                        <button
                          className="absolute top-4 right-4 sm:top-5 sm:right-5"
                          onClick={(e) => handleFavorite(e, product.id)}
                        >
                          {isFavorite ? (
                            <AiFillHeart className="fill-red-500 w-5 h-5 sm:w-7 sm:h-7" />
                          ) : (
                            <MdFavoriteBorder className="w-5 h-5 opacity-70 sm:w-7 sm:h-7" />
                          )}
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>vacio</div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CarouselFeatured;

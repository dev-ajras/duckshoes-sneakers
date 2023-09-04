import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useLocation } from "react-router-dom";

import CarouselFeatured from "./CarouselFeatured";
import { BsShare } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";

function ProductDetails() {
  const { favorites, cart, cartAdd, favoritesHandler } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const colorParam = searchParams.get("color");
  const [productFound, setProductFound] = useState({});
  const [principalImage, setPrincipalImage] = useState(0);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fetchDetailsProducts = async () => {
      setLoading(true);
      const response = await axios.get(`${baseUrl}products/${productId}`);
      console.log(response);
      setLoading(false);
      setProductFound(response.data);
      setPrincipalImage(response.data.images[colorParam].length - 1);
    };
    fetchDetailsProducts();
  }, [productId]);

  const startIndex = productFound && Math.floor(productFound.id / 7857);

  const handleButton = (productToCart) => {
    if (!cart.find((cartItem) => cartItem.id === productToCart.id)) {
      cartAdd({ ...productToCart, quantity: 1 });
    }
  };

  const addToCartRef = useRef(null);

  const addedToCart = (productId) => {
    if (cart.find((cartItem) => cartItem.id === productId)) {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.info("Already added!", {
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    } else {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.success("Added to Cart!", {
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    }
  };

  console.log("productFound ", productFound);

  return (
    <article className="flex justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center p-3 sm:p-5">
          <div className="lg:max-w-6xl w-full">
            <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-2xl">
              Product Details
            </h3>
            {loading === true ? (
              <div className="flex justify-center">
                <ImSpinner8 className="animate-spin w-12 h-12 mt-12 fill-primaryExtraDark" />
              </div>
            ) : productFound ? (
              <div className="p-3 sm:p-5 bg-white rounded-md relative">
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-col gap-3 sm:gap-5 z-10">
                  {productFound.images &&
                    Object.keys(productFound.images).map((color) =>
                      productFound.images[color].map((imageUrl, idx) => (
                        <button
                          key={idx}
                          className={`rounded-sm bg-white ${
                            principalImage == idx
                              ? "ring-blue-500 ring-2"
                              : "ring-gray-500 ring-1"
                          }`}
                          onMouseEnter={() => setPrincipalImage(idx)}
                          onClick={() => setPrincipalImage(idx)}
                        >
                          <img
                            className="bg-white h-12 sm:h-16 w-12 sm:w-16 object-contain mx-auto -z-20"
                            src={imageUrl}
                            alt={idx}
                          />
                        </button>
                      ))
                    )}
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="bg-left relative md:basis-2/3">
                    {productFound.images &&
                      Object.keys(productFound.images).map(
                        (color, colorIdx) => {
                          const productFoundOne = productFound.images[
                            color
                          ].find((imageUrl, idx) => idx === principalImage);
                          return (
                            <div
                              key={colorIdx}
                              className="flex justify-center sm:mb-3 md:mb-5 ml-16"
                            >
                              <img
                                className="bg-left h-56 sm:h-80 object-contain px-5 sm:px-20 md:px-14 lg:px-20"
                                src={productFoundOne}
                                alt={productFoundOne}
                              />
                            </div>
                          );
                        }
                      )}
                    <div className="hidden md:block">
                      <h3 className="font-semibold sm:text-xl">Descripción:</h3>
                      <p className="font-medium opacity-80 mr-24">
                        {productFound.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:basis-1/3  md:w-full">
                    <div className="md:sticky md:top-28 my-3 md:mb-0">
                      <h2 className="font-semibold text-lg line-clamp-2 sm:text-2xl">
                        <span>SKU: </span>
                        <span className="opacity-80">
                          {productFound.sku && productFound.sku.toUpperCase()}
                        </span>
                      </h2>
                      <span className="block my-3 font-semibold text-3xl sm:text-4xl">
                        ${productFound.price}
                      </span>
                      <div className="my-3 font-semibold sm:text-lg">
                        <span>Temporada: </span>
                        <span className="opacity-80 ">
                          {productFound.temporada && productFound.temporada}
                        </span>
                      </div>
                      {productFound.color && (
                        <div>
                          <h3 className="font-semibold mt-2 sm:text-lg">
                            <span>Color: </span>
                            <span className="opacity-80">
                              {productFound.color}
                            </span>
                          </h3>
                          <div className="w-10 rounded-full ring ring-blue-500 ring-offset-2 my-3 sm:ring-offset-4">
                            <img
                              className="drop-shadow-md "
                              src={`/assets/colors/${productFound.color}Color.svg`}
                              alt={productFound.color}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <button
                          className="box-border w-full bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors text-white text-lg font-semibold my-3 p-2 sm:my-5 sm:p-3 rounded-sm"
                          onClick={() => {
                            addedToCart(productFound.id),
                              handleButton(productFound);
                          }}
                        >
                          Add to cart
                        </button>
                        <ToastContainer className="mt-24" />
                      </div>
                      <div className="flex mb-3 gap-3 sm:gap-5">
                        <button
                          onClick={() => favoritesHandler(productFound.id)}
                          className="w-full bg-primaryLight md:hover:bg-primary md:transition-colors p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
                        >
                          {favorites.includes(productFound.id) ? (
                            <AiFillHeart className="fill-red-600 sm:w-5 sm:h-5" />
                          ) : (
                            <MdFavoriteBorder className="sm:w-5 sm:h-5 " />
                          )}
                          <span className="opacity-80">Favorites</span>
                        </button>
                        <a
                          href={`https://api.whatsapp.com/send?phone=541138596093&text=Hola! Quería consulta por las zapatillas ${productFound.sku} | Color: ${colorParam}`}
                          className="w-full bg-primaryLight md:hover:bg-primary md:transition-colors p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
                        >
                          <BsShare className="sm:w-5 sm:h-5" />
                          <span className="opacity-80">Share</span>
                        </a>
                      </div>
                      <div className="md:hidden">
                        <h3 className="font-semibold sm:text-xl opacity-80">
                          Details:
                        </h3>
                        <div>
                          <div className="pt-3 sm:pt-5">
                            <table className="border-collapse table-fixed w-full sm:text-lg">
                              <tbody>
                                <tr className="bg-body">
                                  <td className="w-1/2 p-2 rounded-tl-lg sm:p-3">
                                    Brand
                                  </td>
                                  <td className="w-1/2 p-2 rounded-tr-lg sm:p-3">
                                    {productFound.brand_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="w-1/2 p-2 sm:p-3">Nickname</td>
                                  <td className="w-1/2 p-2 sm:p-3">
                                    {productFound.nickname}
                                  </td>
                                </tr>
                                <tr className="bg-body">
                                  <td className="w-1/2 p-2 sm:p-3">
                                    Release year
                                  </td>
                                  <td className="w-1/2 p-2 sm:p-3">
                                    {productFound.release_year}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="w-1/2 p-2 sm:p-3">Category</td>
                                  <td className="w-1/2 p-2 sm:p-3">
                                    {productFound.category}
                                  </td>
                                </tr>
                                <tr className="bg-body">
                                  <td className="w-1/2 p-2 rounded-bl-lg sm:p-3">
                                    Gender
                                  </td>
                                  <td className="w-1/2 p-2 rounded-br-lg sm:p-3">
                                    {productFound.gender}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <CarouselFeatured
          title={"Related Products"}
          from={startIndex}
          to={startIndex + 10}
        />
      </div>
    </article>
  );
}

export default ProductDetails;

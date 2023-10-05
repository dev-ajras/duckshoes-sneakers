import { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import CarouselFeatured from "./CarouselFeatured";
import { BsShare } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import SkeletonProductsDetails from "./Skeletons/SkeletonProductsDetails";
import { IoReturnDownBack } from "react-icons/io5";

function ProductDetails() {
  const { favorites, cart, cartAdd, favoritesHandler } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const { productId } = useParams();
  const colorParam = searchParams.get("color");
  const [productFound, setProductFound] = useState({});
  const [principalImage, setPrincipalImage] = useState(0);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    setLoading(true);
    const fetchDetailsProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}products/${productId}`);
        setProductFound(response.data);
        setPrincipalImage(0);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsProducts();
  }, [productId]);

  const startIndex = productFound && Math.floor(productFound.id / 7857);

  const handleButton = (productToCart) => {
    if (
      !cart.find(
        (cartItem) =>
          cartItem.id === productToCart.id && cartItem.color === colorParam
      )
    ) {
      cartAdd({ ...productToCart, quantity: 12, color: colorParam });
    }
    addedToCart(productToCart.id);
  };

  const addToCartRef = useRef(null);

  const addedToCart = (productId) => {
    if (
      cart.find(
        (cartItem) => cartItem.id === productId && cartItem.color === colorParam
      )
    ) {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.info("Este producto ya esta agregado", {
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    } else {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.success("Agregado al carrito", {
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    }
  };

  const navigate = useNavigate();

  const returnPrev = () => {
    navigate(-1);
  };

  const productFoundOne =
    productFound.id == productId &&
    productFound.images[colorParam].find(
      (imageUrl, idx) => idx === principalImage
    );

  const favoriteButton = (product) => {
    favoritesHandler({ ...product, color: colorParam });
  };

  return (
    <article className="flex justify-center">
      <ToastContainer className="mt-24" />
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center p-3 sm:p-5">
          <div className="lg:max-w-6xl w-full">
            <button
              onClick={() => returnPrev()}
              className="flex justify-center items-center font-medium text-lg mb-3 sm:mb-5 sm:text-2xl bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors rounded-sm p-1.5 w-10 h-10 "
            >
              <IoReturnDownBack className="stroke-white w-full h-full" />
            </button>
            {loading === true ? (
              <SkeletonProductsDetails />
            ) : productFound.id == productId && productFound.active ? (
              <div className="p-3 sm:p-5 bg-white rounded-md relative">
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-col gap-3 sm:gap-5 z-10">
                  {productFound.images &&
                    productFound.images[colorParam].map((imageUrl, idx) => (
                      <button
                        key={idx}
                        className={`h-12 sm:h-16 w-12 sm:w-16 p-2 md:p-2 rounded-sm bg-white ${
                          principalImage == idx
                            ? "ring-blue-500 ring-2"
                            : "ring-gray-500 ring-1"
                        }`}
                        onMouseEnter={() => setPrincipalImage(idx)}
                        onClick={() => setPrincipalImage(idx)}
                      >
                        <img
                          className="bg-white w-full h-full  object-contain mx-auto -z-20"
                          src={imageUrl}
                          alt={idx}
                        />
                      </button>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="relative md:basis-2/3">
                    <div className="flex justify-center sm:mb-3 md:mb-5 ml-16">
                      <img
                        className="h-56 sm:h-80 object-contain px-5 py-10 sm:px-20 md:px-14 lg:px-28"
                        src={productFoundOne.toString()}
                        alt={productFoundOne.toString()}
                      />
                    </div>
                    {productFound.description && (
                      <div className="hidden md:block">
                        <h3 className="font-semibold sm:text-xl mb-2">
                          Descripción:
                        </h3>
                        <pre className="font-outfit font-normal opacity-80 mr-24 whitespace-pre-wrap">
                          {productFound.description}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="md:basis-1/3  md:w-full">
                    <div className="md:sticky md:top-28 my-3 md:mb-0">
                      <h2 className="font-semibold sm:text-lg line-clamp-2 ">
                        <span>SKU: </span>
                        <span className="opacity-80">
                          {productFound.sku && productFound.sku.toUpperCase()}
                        </span>
                      </h2>
                      <span className="block my-3 font-semibold text-3xl sm:text-4xl">
                        ${parseInt(productFound.price).toLocaleString("es-ES")}
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
                            <span>Seleccionar Color: </span>
                            <span className="opacity-80">{colorParam}</span>
                          </h3>
                          <div className="flex gap-5">
                            {productFound.images &&
                              Object.keys(productFound.images).map(
                                (color, idx) => (
                                  <Link
                                    replace
                                    key={idx}
                                    onClick={() => setPrincipalImage(0)}
                                    to={`/products/${productFound.sku}/${productFound.id}?color=${color}`}
                                    className={`${
                                      color == colorParam
                                        ? "ring ring-blue-500 ring-offset-2 w-10 rounded-full  my-3 sm:ring-offset-4"
                                        : "ring-gray-500 ring-1 w-10 rounded-full  my-3 sm:ring-offset-4"
                                    }`}
                                  >
                                    <img
                                      className="drop-shadow-md rounded-full "
                                      src={`/assets/colors/${color.toLowerCase()}Color.svg`}
                                      alt={color}
                                    />
                                  </Link>
                                )
                              )}
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <button
                          className="box-border w-full text-center bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors text-white text-lg font-semibold my-3 p-2 sm:my-5 sm:p-3 rounded-sm"
                          onClick={() => {
                            handleButton(productFound);
                          }}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                      <div className="flex mb-3 gap-3 sm:gap-5">
                        <button
                          onClick={() => favoriteButton(productFound)}
                          className="w-full bg-primaryLight md:hover:bg-primary md:transition-colors p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
                        >
                          {favorites.some(
                            (fav) =>
                              fav.id == productFound.id &&
                              fav.color === colorParam
                          ) ? (
                            <AiFillHeart className="fill-red-600 sm:w-5 sm:h-5" />
                          ) : (
                            <MdFavoriteBorder className="sm:w-5 sm:h-5 " />
                          )}
                          <span className="opacity-80">Favoritos</span>
                        </button>
                        <a
                          href={`https://api.whatsapp.com/send?phone=541153761179&text=Hola! Quería consulta por las zapatillas ${productFound.sku} | Color: ${colorParam}`}
                          className="w-full bg-primaryLight md:hover:bg-primary md:transition-colors p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
                        >
                          <BsShare className="sm:w-5 sm:h-5" />
                          <span className="opacity-80">Consultar</span>
                        </a>
                      </div>
                      {productFound.description && (
                        <div className="md:hidden">
                          <h3 className="font-semibold sm:text-xl mb-1 md:mb-2 mt-5">
                            Descripción:
                          </h3>
                          <pre className="font-outfit font-normal opacity-80 whitespace-pre-wrap">
                            {productFound.description}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 sm:p-5 bg-white rounded-md relative">
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-col gap-3 sm:gap-5 z-10">
                  {productFound.images &&
                    productFound.color == colorParam &&
                    productFound.images[colorParam].map((imageUrl, idx) => (
                      <button
                        key={idx}
                        className={`h-12 sm:h-16 w-12 sm:w-16 p-2 md:p-2 rounded-sm bg-white ${
                          principalImage == idx
                            ? "ring-blue-500 ring-2"
                            : "ring-gray-500 ring-1"
                        }`}
                        onMouseEnter={() => setPrincipalImage(idx)}
                        onClick={() => setPrincipalImage(idx)}
                      >
                        <img
                          className="bg-white w-full h-full  object-contain mx-auto -z-20"
                          src={imageUrl}
                          alt={idx}
                        />
                      </button>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="relative md:basis-2/3">
                    <div className="flex justify-center sm:mb-3 md:mb-5 ml-16">
                      <img
                        className="h-56 sm:h-80 object-contain px-5 py-10 sm:px-20 md:px-14 lg:px-28"
                        src={productFoundOne.toString()}
                        alt={productFoundOne.toString()}
                      />
                    </div>
                    {productFound.description && (
                      <div className="hidden md:block">
                        <h3 className="font-semibold sm:text-xl mb-2">
                          Descripcidasdón:
                        </h3>
                        <pre className="font-outfit font-normal opacity-80 mr-24 whitespace-pre-wrap">
                          {productFound.description}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="md:basis-1/3  md:w-full">
                    <div className="md:sticky md:top-28 my-3 md:mb-0">
                      <h2 className="font-semibold sm:text-lg line-clamp-2 ">
                        <span>SKU: </span>
                        <span className="opacity-80">
                          {productFound.sku && productFound.sku.toUpperCase()}
                        </span>
                      </h2>
                      <span className="block my-3 font-semibold text-3xl sm:text-4xl">
                        ${parseInt(productFound.price).toLocaleString("es-ES")}
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
                            <span className="opacity-80">{colorParam}</span>
                          </h3>
                          <div className="flex gap-5">
                            {productFound.images &&
                              Object.keys(productFound.images).map(
                                (color, idx) => (
                                  <Link
                                    replace
                                    key={idx}
                                    onClick={() => setPrincipalImage(0)}
                                    to={`/products/${productFound.sku}/${productFound.id}?color=${color}`}
                                    className={`${
                                      color == colorParam
                                        ? "ring ring-blue-500 ring-offset-2 w-10 rounded-full  my-3 sm:ring-offset-4"
                                        : "ring-gray-500 ring-1 w-10 rounded-full  my-3 sm:ring-offset-4"
                                    }`}
                                  >
                                    <img
                                      className="drop-shadow-md rounded-full "
                                      src={`/assets/colors/${color.toLowerCase()}Color.svg`}
                                      alt={color}
                                    />
                                  </Link>
                                )
                              )}
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <span className="box-border w-full text-center bg-[#FF3535]/30 text-[#B51A1A] text-lg font-semibold my-3 p-2 sm:my-5 sm:p-3 rounded-sm">
                          Publicación Inactiva
                        </span>
                      </div>
                      {productFound.description && (
                        <div className="md:hidden">
                          <h3 className="font-semibold sm:text-xl mb-1 md:mb-2 mt-5">
                            Descripción:
                          </h3>
                          <pre className="font-outfit font-normal opacity-80 whitespace-pre-wrap">
                            {productFound.description}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <CarouselFeatured title={"Productos Relacionados"} from={9} />
      </div>
    </article>
  );
}

export default ProductDetails;

import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CarouselDetails from './CarouselDetails';
import { AppContext } from '../context/AppProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CarouselFeatured from './CarouselFeatured';
import { BsShare } from 'react-icons/bs';
import { MdFavoriteBorder } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

function ProductDetails() {
  const { products, favorites, cart, cartAdd, favoritesHandler } =
    useContext(AppContext);

  const { productName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sizeParam = searchParams.get('size');
  const colorParam = searchParams.get('color');
  const [productFound, setProductFound] = useState({});
  const [randomNum, setRandomNum] = useState(20);

  useEffect(() => {
    const productNameDetails = products.find((dat) => dat.name === productName);
    setProductFound(productNameDetails);
  }, [products, productName]);

  const handleButton = (productId, color, size) => {
    cartAdd({ id: productId, color: color, size: size, quantity: 1 });
  };

  function compare(a, b) {
    return a - b;
  }

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * (70 - 20 + 1)) + 20);
  }, []);

  const addToCartRef = useRef(null);

  const addedToCart = (productId) => {
    if (cart.find((cartItem) => cartItem.id === productId)) {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.info('Already added!', {
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    } else {
      if (!toast.isActive(addToCartRef.current)) {
        addToCartRef.current = toast.success('Added to Cart!', {
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      }
    }
  };

  return (
    <article className="flex justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center p-3 sm:p-5">
          <div className="lg:max-w-6xl w-full">
            <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-2xl">
              Product Details
            </h3>
            {productFound ? (
              <div className="p-3 sm:p-5 bg-white rounded-md ">
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="relative md:basis-2/3">
                    <img
                      className="bg-white ml-9 h-56 sm:h-96 md:h-[550px] object-contain mx-auto -scale-x-100 -rotate-[60deg] [clip-path:polygon(19% 18%, 21% 69%, 67% 76%, 88% 22%, 63% 9%, 30% 7%)] clip-path-image"
                      src={productFound.main_picture_url}
                      alt={productFound.nickname}
                    />
                    <div className="hidden md:block">
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
                  <div className="md:basis-1/3  md:w-full">
                    <div className="md:sticky md:top-28 my-3">
                      <h4 className=" font-bold opacity-40">
                        {productFound.brand_name}
                      </h4>
                      <h2 className="font-semibold text-lg line-clamp-2 sm:text-2xl">
                        {productFound.name && productFound.name.toUpperCase()}
                      </h2>
                      <p className="my-3">
                        {productFound.story_html &&
                          productFound.story_html
                            .substring(3, productFound.story_html.length - 5)
                            .split('.', 1)}
                        .
                      </p>
                      <span className="block my-3 font-semibold text-3xl sm:text-4xl">
                        ${productFound.retail_price_cents / 100}
                      </span>
                      <div className="font-semibold mt-2 my-3 sm:text-lg">
                        <span className="opacity-80">Size: </span>
                        <select
                          className="bg-body py-1 px-2 rounded-sm text-center"
                          name="sizeDrop"
                          id="sizeDrop"
                        >
                          {productFound.size_range &&
                            productFound.size_range
                              .sort(compare)
                              .map((size, idx) => (
                                <option key={idx} value={size}>
                                  {size}
                                </option>
                              ))}
                        </select>
                      </div>
                      {/* <CarouselDetails
                      arrayDetails={
                        productFound.size_range &&
                        productFound.size_range.sort(compare)
                      }
                    /> */}
                      {productFound.color && (
                        <div>
                          <h3 className="font-semibold mt-2 sm:text-lg">
                            <span className="opacity-80">Color: </span>
                            {productFound.color}
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
                          className="box-border w-full bg-primaryDark text-white text-lg font-bold my-3 p-2 sm:my-5 sm:p-3 rounded-sm"
                          onClick={() => {
                            addedToCart(productFound.id),
                              handleButton(
                                productFound.id,
                                colorParam,
                                sizeParam
                              );
                          }}
                        >
                          Add to cart
                        </button>
                        <ToastContainer className="mt-24" />
                      </div>
                      <div className="flex mb-3 gap-3 sm:gap-5">
                        <button
                          onClick={() => favoritesHandler(productFound.id)}
                          className="w-full bg-primaryLight p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
                        >
                          {favorites.includes(productFound.id) ? (
                            <AiFillHeart className="fill-red-600 sm:w-5 sm:h-5" />
                          ) : (
                            <MdFavoriteBorder className="sm:w-5 sm:h-5 " />
                          )}
                          <span className="opacity-80">Favorites</span>
                        </button>
                        <a
                          href={`https://api.whatsapp.com/send?phone=541138596093&text=Hola! Quería consulta por las zapatillas ${productFound.name} | Talle: ${sizeParam} | Color: ${colorParam}`}
                          className="w-full bg-primaryLight p-1 flex justify-center items-center gap-2 sm:p-2 sm:gap-3 font-bold rounded-sm"
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
              ''
            )}
          </div>
        </div>
        <CarouselFeatured
          title={'Related Products'}
          from={randomNum}
          to={randomNum + 10}
        />
      </div>
    </article>
  );
}

export default ProductDetails;

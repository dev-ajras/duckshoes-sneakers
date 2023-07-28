import { useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CarouselDetails from './CarouselDetails';
import { AppContext } from '../context/AppProvider';

import { BsShare } from 'react-icons/bs';
import { MdFavoriteBorder } from 'react-icons/md';
import CarouselFeatured from './CarouselFeatured';

function ProductDetails() {
  const { products, cartAdd, favoritesHandler } = useContext(AppContext);

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

  return (
    <article className="flex justify-center">
      <div className="flex flex-col items-center w-full">
        <div className=" lg:max-w-6xl w-full m-3 sm:m-5 ">
          <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-3xl">
            Product Details
          </h3>
          {productFound ? (
            <div className="p-3 sm:p-5 bg-white rounded-md ">
              <h2 className="font-semibold text-lg line-clamp-1 leading-10 bg-white sm:text-3xl">
                {productFound.name}
              </h2>
              <img
                className="bg-white min-h-[375px] object-contain mx-auto"
                src={productFound.main_picture_url}
                alt={productFound.nickname}
              />
              <span className="font-bold text-3xl bg-white sm:text-5xl">
                ${productFound.retail_price_cents / 100}
              </span>
              <h3 className="font-semibold bg-white mt-2  sm:mt-3 sm:text-2xl">
                <span className="opacity-80">Size: </span>
                {sizeParam}
              </h3>
              <CarouselDetails
                arrayDetails={
                  productFound.size_range &&
                  productFound.size_range.sort(compare)
                }
              />
              {productFound.color && (
                <div>
                  <h3 className="font-semibold bg-white mt-2 sm:text-2xl">
                    <span className="opacity-80">Color: </span>
                    {productFound.color}
                  </h3>
                  <div className="w-10 rounded-full ring ring-blue-500 ring-offset-2 my-3 sm:my-5 sm:w-16 sm:ring-offset-4">
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
                  className="box-border w-full bg-primaryDark text-white text-lg font-bold my-3 p-2 rounded-lg sm:text-3xl sm:my-5 sm:p-3"
                  onClick={() =>
                    handleButton(productFound.id, colorParam, sizeParam)
                  }
                >
                  Add to cart
                </button>
              </div>
              <div className="flex mb-3 gap-3 sm:gap-5 sm:mb-5">
                <button
                  onClick={() => favoritesHandler(productFound.id)}
                  className="w-full bg-primaryLight p-1 rounded-md flex justify-center items-center gap-2 sm:p-2 sm:gap-3 sm:text-2xl"
                >
                  <MdFavoriteBorder />
                  Add favorites
                </button>
                <a
                  href={`https://api.whatsapp.com/send?phone=541138596093&text=Hola! Quería consulta por las zapatillas ${productFound.name} | Talle: ${sizeParam} | Color: ${colorParam}`}
                  className="w-full bg-primaryLight p-1 rounded-md flex justify-center items-center gap-2 sm:p-2 sm:gap-3 sm:text-2xl"
                >
                  <BsShare />
                  Share
                </a>
              </div>
              <h3 className="font-semibold sm:text-2xl opacity-80">Details:</h3>
              <div className="py-3 sm:py-5">
                <table className="border-collapse table-fixed w-full sm:text-2xl">
                  <tbody>
                    <tr className="bg-body">
                      <td className="w-1/2 p-2 rounded-tl-lg sm:p-3">Brand</td>
                      <td className="w-1/2 p-2 rounded-tr-lg text-right sm:p-3">
                        {productFound.brand_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/2 p-2 sm:p-3">Nickname</td>
                      <td className="w-1/2 p-2 text-right sm:p-3">
                        {productFound.nickname}
                      </td>
                    </tr>
                    <tr className="bg-body">
                      <td className="w-1/2 p-2 sm:p-3">Release year</td>
                      <td className="w-1/2 p-2 text-right sm:p-3">
                        {productFound.release_year}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/2 p-2 sm:p-3">Category</td>
                      <td className="w-1/2 p-2 text-right sm:p-3">
                        {productFound.category}
                      </td>
                    </tr>
                    <tr className="bg-body">
                      <td className="w-1/2 p-2 rounded-bl-lg sm:p-3">Gender</td>
                      <td className="w-1/2 p-2 rounded-br-lg text-right sm:p-3">
                        {productFound.gender}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <CarouselFeatured
          title={'Recommended'}
          from={randomNum}
          to={randomNum + 10}
        />
      </div>
    </article>
  );
}

export default ProductDetails;

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
    <div className='bg-white'>
      {productFound ? (
        <>
          {' '}
          <h2 className='font-semibold text-lg line-clamp-1 leading-10 p-3 he bg-white'>
            {productFound.name}
          </h2>
          <img
            className='bg-white min-h-[375px]'
            src={productFound.main_picture_url}
            alt={productFound.nickname}
          />
          <span className='font-bold text-3xl p-3 bg-white'>
            ${productFound.retail_price_cents / 100}
          </span>
          <h3 className='font-semibold bg-white px-3 mt-2'>
            Size: {sizeParam}
          </h3>
          <CarouselDetails
            arrayDetails={
              productFound.size_range && productFound.size_range.sort(compare)
            }
          />
          {productFound.color && (
            <div>
              <h3 className='font-semibold bg-white px-3 mt-2'>
                Color: {productFound.color}
              </h3>
              <div className='w-10 m-3 rounded-full ring ring-blue-500 ring-offset-2'>
                <img
                  className='drop-shadow-md '
                  src={`/assets/colors/${productFound.color}Color.svg`}
                  alt={productFound.color}
                />
              </div>
            </div>
          )}
          <div className='flex'>
            <button
              className='box-border w-full bg-primaryDark text-white text-lg font-bold m-3 p-2 rounded-lg self-'
              onClick={() =>
                handleButton(productFound.id, colorParam, sizeParam)
              }
            >
              Add to cart
            </button>
          </div>
          <div className='flex mb-3'>
            <button
              onClick={() => favoritesHandler(productFound.id)}
              className='w-full bg-primaryLight mx-3  p-1 rounded-md flex justify-center items-center gap-2'
            >
              <MdFavoriteBorder />
              Add favorites
            </button>
            <a
              href={`https://api.whatsapp.com/send?phone=541138596093&text=Hola! Quería consulta por las zapatillas ${productFound.name} | Talle: ${sizeParam} | Color: ${colorParam}`}
              className='w-full bg-primaryLight mx-3 p-1 rounded-md flex justify-center items-center gap-2'
            >
              <BsShare />
              Share
            </a>
          </div>
          <h3 className='font-semibold px-3'>Details</h3>
          <div className='p-3'>
            <table className='border-collapse table-fixed w-full'>
              <tbody>
                <tr className='bg-body'>
                  <td className='w-1/2 p-2 rounded-tl-lg'>Brand</td>
                  <td className='w-1/2 p-2 rounded-tr-lg text-right'>
                    {productFound.brand_name}
                  </td>
                </tr>
                <tr>
                  <td className='w-1/2 p-2'>Nickname</td>
                  <td className='w-1/2 p-2 text-right'>
                    {productFound.nickname}
                  </td>
                </tr>
                <tr className='bg-body'>
                  <td className='w-1/2 p-2'>Release year</td>
                  <td className='w-1/2 p-2 text-right'>
                    {productFound.release_year}
                  </td>
                </tr>
                <tr>
                  <td className='w-1/2 p-2'>Category</td>
                  <td className='w-1/2 p-2 text-right'>
                    {productFound.category}
                  </td>
                </tr>
                <tr className='bg-body'>
                  <td className='w-1/2 p-2 rounded-bl-lg'>Gender</td>
                  <td className='w-1/2 p-2 rounded-br-lg text-right'>
                    {productFound.gender}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <CarouselFeatured
            title={'Recommended'}
            from={randomNum}
            to={randomNum + 10}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default ProductDetails;

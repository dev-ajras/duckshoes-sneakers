import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';
import { IoReturnDownBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const { favorites } = useContext(AppContext);

  const navigate = useNavigate();

  const returnPrev = () => {
    navigate(-1);
  };

  return (
    <section className='bg-body flex justify-center'>
      <div className='lg:max-w-6xl m-3 sm:m-5 w-full'>
        <button
          onClick={() => returnPrev()}
          className='flex justify-center items-center font-medium text-lg mb-3 sm:mb-5 sm:text-2xl bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors rounded-sm p-1.5 w-10 h-10 '
        >
          <IoReturnDownBack className='stroke-white w-full h-full' />
        </button>
        {!favorites && (
          <div className='m-3 flex flex-col items-center sm:mt-12'>
            <h5 className='font-normal md:font-medium text-lg bg-primaryLight px-2 py-1 sm:px-3 sm:py-2 mb-1 sm:mb-2'>
              Favoritos vacío
            </h5>
            <p className='font-normal md:font-medium'>Agrega a tus favoritos</p>
            <img
              className='w-80 mt-5 sm:w-96'
              src='/assets/illustrations/favoritesEmpty.svg'
              alt='favoritesEmpty'
            />
          </div>
        )}
        <div className='grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4'>
          {favorites.map((filteredProduct) => (
            <ProductCard
              favoritesCard={true}
              product={filteredProduct}
              key={filteredProduct.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;

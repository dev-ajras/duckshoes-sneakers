import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { favorites, products } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    favorites.some((fav) => fav === product.id)
  );

  return (
    <section className='bg-body flex justify-center'>
      <div className='lg:max-w-6xl m-3 sm:m-5'>
        <h3 className='font-bold text-xl mb-3 sm:text-3xl sm:mb-5'>
          Favorites
        </h3>
        {!filteredProducts.length && (
          <div className='m-3 flex flex-col items-center'>
            <h5 className='font-semibold text-lg bg-primaryLight px-3 p-1 mb-2'>
              It's empty
            </h5>
            <p className='font-semibold'>Please add your favorites sneakers</p>
            <img
              className='w-64 mt-5'
              src='/assets/illustrations/favoritesEmpty.svg'
              alt='favoritesEmpty'
            />
          </div>
        )}
        <div className='grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4'>
          {filteredProducts.map((filteredProduct) => (
            <ProductCard product={filteredProduct} key={filteredProduct.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;

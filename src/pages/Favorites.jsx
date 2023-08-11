import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { favorites, products } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    favorites.some((fav) => fav === product.id)
  );

  return (
    <section className="bg-body flex justify-center">
      <div className="lg:max-w-6xl m-3 sm:m-5 w-full">
        <h3 className="font-bold text-xl mb-3 sm:text-2xl sm:mb-5">
          Favorites
        </h3>
        {!filteredProducts.length && (
          <div className="m-3 flex flex-col items-center sm:mt-12">
            <h5 className="font-semibold text-lg bg-primaryLight px-2 py-1 sm:px-3 sm:py-2 mb-1 sm:mb-2">
              It's empty
            </h5>
            <p className="font-semibold">Please add your favorites sneakers</p>
            <img
              className="w-80 mt-5 sm:w-96"
              src="/assets/illustrations/favoritesEmpty.svg"
              alt="favoritesEmpty"
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((filteredProduct) => (
            <ProductCard product={filteredProduct} key={filteredProduct.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;

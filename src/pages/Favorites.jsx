import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { favorites, products } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    favorites.some((fav) => fav === product.id)
  );

  return (
    <section className="bg-body">
      <h3 className="font-bold text-lg pt-2 mx-3">Favorites</h3>
      {!filteredProducts.length && (
        <div className="m-3">
          <h5 className="font-semibold">Favorites empty</h5>
          <p>Add your favorites sneakers!</p>
        </div>
      )}
      <div className="grid grid-cols-2 p-3 gap-3">
        {filteredProducts.map((filteredProduct) => (
          <ProductCard product={filteredProduct} key={filteredProduct.id} />
        ))}
      </div>
    </section>
  );
}

export default Favorites;

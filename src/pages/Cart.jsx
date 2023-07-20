import { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppProvider';

function Cart() {
  const { products, cart } = useContext(AppContext);
  console.log(cart)

  const filteredProducts = products.filter((product) => cart.some(cartItem => cartItem.id === product.id) )

  return (
    <section>
      <h3 className="font-bold text-lg m-3">Cart</h3>
      <div className="grid grid-cols-2 p-3 gap-3">
      {filteredProducts.map((filteredProduct) => (
        <ProductCard product={filteredProduct} key={filteredProduct.id}/>
      ))}
      </div>
    </section>
  );
}

export default Cart;

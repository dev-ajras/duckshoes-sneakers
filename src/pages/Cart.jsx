import { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppProvider';

function Cart() {
  const { products, cart } = useContext(AppContext);
  console.log(cart);

  const filteredProducts = products.filter((product) =>
    cart.some((cartItem) => cartItem.id === product.id)
  );

  return (
    <section className="bg-white">
      <h3 className="font-bold text-lg m-3">Cart</h3>
      <div>
        {filteredProducts.map((filteredProduct) => (
          <div key={filteredProduct.id}>
            <div className="flex gap-3 my-3 p-3">
              <div className="w-28">
                <img
                  src={filteredProduct.grid_picture_url}
                  alt={filteredProduct.name}
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg line-clamp-2 leading-6">
                  {filteredProduct.name}
                </h4>
                <div className="flex gap-2 font-semibold text-sm my-1">
                  <p>
                    <span className="opacity-70">Color: </span>
                    <span>{filteredProduct.color}</span>
                  </p>
                  <p>
                    <span className="opacity-70">Size: </span>
                    <span>5</span>
                  </p>
                </div>
                <div className="font-bold text-xl mt-1 mb-3">
                  <span>${filteredProduct.retail_price_cents / 100}</span>
                </div>
                <div className="flex justify-evenly">
                  <div className="flex gap-3 px-3 py-1 outline outline-2 outline-body bg-white rounded-md font-semibold">
                    <span>-</span>
                    <span>1</span>
                    <span>+</span>
                  </div>
                  <button
                    onClick={(e) => handleRemove(e, filteredProduct.id)}
                    className="flex gap-3 px-3 py-1 outline outline-2 outline-body rounded-md bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cart;

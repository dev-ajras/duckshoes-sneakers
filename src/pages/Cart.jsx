import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import AddRemoveButtons from '../components/AddRemoveButtons';
import TotalCart from '../components/TotalCart';

function Cart() {
  const { products, cart } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    cart.some((cartItem) => cartItem.id === product.id)
  );

  return (
    <section className="flex justify-center">
      <div className="max-w-6xl w-full m-3 sm:m-5">
        <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-2xl">Cart</h3>
        <div
          className={`${
            filteredProducts.length > 0 ? 'bg-white' : 'bg-body'
          } rounded-md`}
        >
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((filteredProduct) => (
                <div key={filteredProduct.id}>
                  <div className="flex gap-3 my-3 p-3 md:gap-5 md:my-5">
                    <div className="w-28 sm:w-36 md:w-48">
                      <img
                        src={filteredProduct.grid_picture_url}
                        alt={filteredProduct.name}
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-lg line-clamp-2 leading-6 sm:text-2xl sm:leading-10">
                        {filteredProduct.name}
                      </h4>
                      <div className="flex gap-2 font-semibold text-sm my-1 sm:gap-3 sm:text-lg">
                        <p>
                          <span className="opacity-70">Color: </span>
                          <span>{filteredProduct.color}</span>
                        </p>
                        <p>
                          <span className="opacity-70">Size: </span>
                          <span>
                            {
                              cart.find(
                                (cartItem2) =>
                                  cartItem2.id === filteredProduct.id
                              ).size
                            }
                          </span>
                        </p>
                      </div>
                      <div className="font-bold text-xl mt-1 mb-3 sm:text-2xl sm:mt-2 sm:mb-5">
                        <span>${filteredProduct.retail_price_cents / 100}</span>
                      </div>
                      <AddRemoveButtons
                        filteredProductId={filteredProduct.id}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
              <TotalCart filteredProducts={filteredProducts} />
            </>
          ) : (
            <div className="flex flex-col items-center m-2 sm:m-3 sm:mt-12">
              <h5 className="bg-primaryLight text-lg font-semibold px-2 py-1 mb-1 sm:px-3 sm:py-2 sm:mb-2">
                It's empty
              </h5>
              <p className="font-semibold">Add products (+)</p>
              <img
                className="my-5 w-40 sm:my-8 sm:w-64"
                src="/assets/illustrations/cartEmpty.svg"
                alt="cartEmpty"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;

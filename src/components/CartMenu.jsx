import { useContext } from 'react';

import { motion } from 'framer-motion';
import { AppContext } from '../context/AppProvider';

function CartMenu({ cartMenu, setCartMenu }) {
  const { products, cart, cartRemove } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    cart.some((cartItem) => cartItem.id === product.id)
  );

  const cartMenuBgVariants = {
    active: { opacity: 0.4 },
    inactive: { opacity: 0 },
  };

  const cartMenuVariants = {
    active: { x: 0 },
    inactive: { x: '100%' },
  };

  const handleRemove = (e, productId) => {
    e.preventDefault();
    cartRemove({ id: productId });
  };

  return (
    <>
      <motion.div
        initial="inactive"
        animate={!cartMenu ? 'inactive' : 'active'}
        variants={cartMenuVariants}
        transition={{ duration: 0.3 }}
        className="absolute top-14 right-0 z-40 w-3/4 h-screen drop-shadow-md p-2 bg-white"
      >
        <h3 className="font-bold text-xl p-1">Cart</h3>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center m-2">
            <h5 className="bg-primaryLight text-lg font-semibold px-2 py-1 mb-1">
              It's empty
            </h5>
            <p className="font-semibold">Add products (+)</p>
            <img
              className="my-5 w-40"
              src="/assets/illustrations/cartEmpty.svg"
              alt="cartEmpty"
            />
          </div>
        ) : (
          <div>
            {filteredProducts.map((filteredProduct) => (
              <div key={filteredProduct.id}>
                <div className="flex gap-3 my-3">
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
        )}
      </motion.div>
      <motion.div
        initial="inactive"
        animate={!cartMenu ? 'inactive' : 'active'}
        variants={cartMenuBgVariants}
        transition={{ duration: 0.3 }}
        className={`absolute bg-black h-screen w-screen top-14 left-0 ${
          !cartMenu && 'pointer-events-none'
        }`}
        onClick={() => setCartMenu(false)}
      ></motion.div>
    </>
  );
}

export default CartMenu;

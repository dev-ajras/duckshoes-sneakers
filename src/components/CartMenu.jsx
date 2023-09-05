import { useContext } from "react";

import { motion } from "framer-motion";
import { AppContext } from "../context/AppProvider";
import AddRemoveButtons from "./AddRemoveButtons";
import TotalCart from "./TotalCart";

function CartMenu({ cartMenu, setCartMenu }) {
  const { cart } = useContext(AppContext);

  const cartMenuBgVariants = {
    active: { opacity: 0.4 },
    inactive: { opacity: 0 },
  };

  const cartMenuVariants = {
    active: { x: 0 },
    inactive: { x: "100%" },
  };

  return (
    <>
      <motion.div
        initial="inactive"
        animate={!cartMenu ? "inactive" : "active"}
        variants={cartMenuVariants}
        transition={{ duration: 0.3 }}
        className="absolute top-14 pb-24 right-0 z-40 w-3/4 h-[100dvh] drop-shadow-md p-2 bg-white sm:p-3 md:top-24 sm:pb-24 md:w-1/2 lg:w-96 flex flex-col"
      >
        <h3 className="font-medium text-xl p-1 sm:p-2 sm:text-2xl">Cart</h3>
        <div className="  overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center m-2 sm:m-3">
              <h5 className="bg-primaryLight text-lg font-normal px-2 py-1 mb-1 sm:px-3 sm:py-2 sm:mb-2">
                It's empty
              </h5>
              <p className="font-normal">Add products (+)</p>
              <img
                className="my-5 w-40 sm:my-8 sm:w-64"
                src="/assets/illustrations/cartEmpty.svg"
                alt="cartEmpty"
              />
            </div>
          ) : (
            <div>
              {cart.map((filteredProduct) => (
                <div key={filteredProduct.id}>
                  <div className="flex gap-3 sm:gap-5 my-3 sm:my-5">
                    <div className="sm:w-36">
                      {filteredProduct.images &&
                        Object.keys(filteredProduct.images).map(
                          (color, colorIdx) => {
                            const image0 = filteredProduct.images[color][0];
                            return (
                              <img
                                key={colorIdx}
                                src={image0}
                                alt={filteredProduct.name}
                              />
                            );
                          }
                        )}
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-md line-clamp-2 leading-6 sm:text-xl sm:leading-8">
                        {filteredProduct.name}
                      </h4>
                      <div className="flex gap-2 font-semibold text-xs my-1 sm:gap-3 sm:text-base sm:my-2">
                        <p>
                          <span className="opacity-60">Color: </span>
                          <span>{filteredProduct.color}</span>
                        </p>
                        <p>
                          <span className="opacity-60">Size: </span>
                          <span>5</span>
                        </p>
                      </div>
                      <div className="font-bold text-xl mt-1 mb-3 sm:text-2xl sm:mt-2 sm:mb-5">
                        <span>${filteredProduct.price}</span>
                      </div>
                      <AddRemoveButtons
                        filteredProductId={filteredProduct.id}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 ? (
          <div className="bg-white">
            <TotalCart filteredProducts={cart} setCartMenu={setCartMenu} />
          </div>
        ) : (
          ""
        )}
      </motion.div>
      <motion.div
        initial="inactive"
        animate={!cartMenu ? "inactive" : "active"}
        variants={cartMenuBgVariants}
        transition={{ duration: 0.3 }}
        className={`absolute bg-black h-screen w-screen top-14 left-0 md:top-24 ${
          !cartMenu && "pointer-events-none"
        }`}
        onClick={() => setCartMenu(false)}
      ></motion.div>
    </>
  );
}

export default CartMenu;

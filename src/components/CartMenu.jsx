import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CartMenu({ cartMenu, setCartMenu }) {
  const cartMenuBgVariants = {
    active: { opacity: 0.4 },
    inactive: { opacity: 0 },
  };

  const cartMenuVariants = {
    active: { x: 0 },
    inactive: { x: '100%' },
  };

  return (
    <>
      <motion.div
        initial="inactive"
        animate={!cartMenu ? 'inactive' : 'active'}
        variants={cartMenuVariants}
        transition={{ duration: 0.3 }}
        className="absolute top-14 right-0 z-40 w-1/2 h-screen drop-shadow-md p-2 bg-white"
      >
        <h3 className="font-bold text-xl p-1">Cart</h3>
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
        <ul>
          <li></li>
        </ul>
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

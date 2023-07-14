import React from 'react';

import { motion } from 'framer-motion';

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
      <motion.div initial="inactive"
      animate={!cartMenu ? 'inactive' : 'active'}
      variants={cartMenuVariants}
      transition={{ duration: 0.3 }}
      className="absolute top-14 right-0 z-40 w-1/2 h-screen drop-shadow-md p-2 bg-white">
        <h3 className="font-bold text-lg p-1">Cart</h3>
        <ul>
          <li>
            
          </li>
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

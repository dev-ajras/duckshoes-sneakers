import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { RiShoppingBagFill } from 'react-icons/ri';
import { PiSneakerFill } from 'react-icons/pi';
import { MdAccountCircle } from 'react-icons/md';

import { AnimatePresence, motion } from 'framer-motion';

function NavbarMenu({ navbarMenu, setNavbarMenu }) {
  return (
    <div>
      <ul className="absolute top-14 right-0 z-40 w-1/2 h-screen drop-shadow-md p-2 bg-white">
        <li>
          <Link
            to="/"
            onClick={() => setNavbarMenu(false)}
            className="flex gap-2 items-center text-lg my-2"
          >
            <AiFillHome className="fill-background" />
            <h5 className="text-background font-bold">Home</h5>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => setNavbarMenu(false)}
            className="flex gap-2 items-center text-lg my-2"
          >
            <PiSneakerFill className="fill-background" />
            <h5 className="text-background font-bold">Products</h5>
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            onClick={() => setNavbarMenu(false)}
            className="flex gap-2 items-center text-lg my-2"
          >
            <RiShoppingBagFill className="fill-background" />
            <h5 className="text-background font-bold">Cart</h5>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={() => setNavbarMenu(false)}
            className="flex gap-2 items-center text-lg my-2"
          >
            <MdAccountCircle className="fill-background" />
            <h5 className="text-background font-bold">Login</h5>
          </Link>
        </li>
      </ul>
      <AnimatePresence>
        {navbarMenu && (
          <motion.div
            className="absolute bg-black opacity-40 h-screen w-screen top-14 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavbarMenu;

import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { RiShoppingBagFill } from 'react-icons/ri';
import { PiSneakerFill } from 'react-icons/pi';
import { MdAccountCircle } from 'react-icons/md';

function NavbarMenu() {
  return (
    <div className="absolute top-20 right-0 z-10 w-1/2 h-full p-2  bg-white ">
      <ul className="">
        <li className="flex items-center gap-2 text-lg">
          <AiFillHome className="fill-background" />
          <Link to="/" className="text-background font-semibold">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-2 text-lg">
          <PiSneakerFill className="fill-background" />
          <Link to="/products" className="text-background font-semibold">
            Products
          </Link>
        </li>
        <li className="flex items-center gap-2 text-lg">
          <RiShoppingBagFill className="fill-background" />
          <Link to="/cart" className="text-background font-semibold">
            Cart
          </Link>
        </li>
        <li className="flex items-center gap-2 text-lg">
          <MdAccountCircle className="fill-background" />
          <Link to="/login" className="text-background font-semibold">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavbarMenu;

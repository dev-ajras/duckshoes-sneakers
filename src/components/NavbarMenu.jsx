import React from 'react';
import { Link } from 'react-router-dom';

function NavbarMenu() {
  return (
    <div className="absolute top-20 right-0 z-10 w-3/4 h-full p-2  bg-white ">
      <ul className="">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavbarMenu;

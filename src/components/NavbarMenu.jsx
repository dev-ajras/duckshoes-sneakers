import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

import { Link } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { PiSneakerFill } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";
import { BiSolidHelpCircle } from "react-icons/bi";

import { motion } from "framer-motion";

function NavbarMenu() {
  const { navbarMenu, setNavbarMenu, setCartMenu } = useContext(AppContext);

  const menuVariants = {
    active: { opacity: 0.4 },
    inactive: { opacity: 0 },
  };

  const navbarMenuVariants = {
    active: { x: 0 },
    inactive: { x: "100%" },
  };

  const navAndCartOff = () => {
    setNavbarMenu(false);
    setCartMenu(false);
  };

  return (
    <div onBlur={() => setNavbarMenu(false)} tabIndex={0}>
      <motion.ul
        initial="inactive"
        animate={!navbarMenu ? "inactive" : "active"}
        variants={navbarMenuVariants}
        transition={{ duration: 0.3 }}
        className={`${
          !navbarMenu ? "md:left-[-100%]" : ""
        } absolute top-20 md:top-0 right-0 z-30 w-1/2 h-screen drop-shadow-md p-3 bg-white text-xl flex flex-col sm:p-5 md:flex-row md:h-full md:left-0 md:w-full md:relative md:bg-background md:text-lg md:items-center md:p-0 md:gap-4`}
      >
        <li>
          <Link
            to="/"
            onClick={() => navAndCartOff()}
            onBlur={() => setNavbarMenu(false)}
            className="flex gap-2 items-center p-2 sm:gap-3 sm:p-3 md:p-1"
          >
            <AiFillHome className="fill-background md:hidden" />
            <h5 className="text-background font-semibold md:text-white md:font-normal md:hover:text-primaryLight transition-colors">
              Inicio
            </h5>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => navAndCartOff()}
            className="flex gap-2 items-center p-2 sm:gap-3 sm:p-3 md:p-1"
          >
            <PiSneakerFill className="fill-background md:hidden" />
            <h5 className="text-background font-semibold md:text-white md:font-normal md:hover:text-primaryLight transition-colors">
              Productos
            </h5>
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            onClick={() => navAndCartOff()}
            className="flex gap-2 items-center p-2 sm:gap-3 sm:p-3 md:p-1"
          >
            <MdFavorite className="fill-background md:hidden" />
            <h5 className="text-background font-semibold md:text-white md:font-normal md:hover:text-primaryLight transition-colors">
              Favoritos
            </h5>
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            onClick={() => navAndCartOff()}
            className="flex gap-2 items-center p-2 sm:gap-3 sm:p-3 md:p-1"
          >
            <RiShoppingBagFill className="fill-background md:hidden" />
            <h5 className="text-background font-semibold md:text-white md:font-normal md:hover:text-primaryLight transition-colors">
              Carrito
            </h5>
          </Link>
        </li>
        <li>
          <Link
            to="/service"
            onClick={() => navAndCartOff()}
            className="flex gap-2 items-center p-2 sm:gap-3 sm:p-3 md:p-1"
          >
            <BiSolidHelpCircle className="fill-background md:hidden" />
            <h5 className="text-background font-semibold md:text-white md:font-normal md:hover:text-primaryLight transition-colors">
              Servicio
            </h5>
          </Link>
        </li>
      </motion.ul>
      <motion.div
        initial="inactive"
        animate={!navbarMenu ? "inactive" : "active"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className={`absolute bg-black h-screen w-screen top-20 md:top-24 left-0 md:hidden ${
          !navbarMenu && "pointer-events-none"
        }`}
        onClick={() => setNavbarMenu(false)}
      ></motion.div>
    </div>
  );
}

export default NavbarMenu;

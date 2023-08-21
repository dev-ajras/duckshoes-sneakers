import { useState, useEffect, useContext } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { RiShoppingBagLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { TiTimes } from "react-icons/ti";
import { BiSolidUserCircle } from "react-icons/bi";

import NavbarMenu from "./NavbarMenu";
import CartMenu from "./CartMenu";
import { AppContext } from "../context/AppProvider";

function Navbar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const [inputSearch, setInputSearch] = useState(q ?? "");
  const [navbarMenu, setNavbarMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [logMenu, setLogMenu] = useState(false);

  const navigate = useNavigate();

  const { user, setUser, cart } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${inputSearch}&page=1`);
  };

  useEffect(() => {
    if (q !== inputSearch) {
      setInputSearch("");
    }
  }, [q]);

  const handleMenu = () => {
    setCartMenu(false);
    setNavbarMenu(!navbarMenu);
  };

  const handleCart = () => {
    setNavbarMenu(false);
    setCartMenu(!cartMenu);
  };

  return (
    <header className=" flex flex-col justify-center bg-background px-3 h-14 fixed w-full z-40 top-6 sm:px-5 md:top-0">
      <NavbarMenu
        navbarMenu={navbarMenu}
        setNavbarMenu={setNavbarMenu}
        setCartMenu={setCartMenu}
      />
      <CartMenu cartMenu={cartMenu} setCartMenu={setCartMenu} />
      <nav className="flex gap-3 w-full justify-between items-center sm:gap-5 lg:max-w-6xl mx-auto">
        <Link className="md:basis-1/5" to="/">
          <h3 className="text-white font-semibold w-full flex text-lg gap-2 sm:text-2xl">
            <span>Duck</span>
            <span>Shoes</span>
          </h3>
        </Link>
        <form
          className="w-full flex justify-center md:basis-2/5"
          onSubmit={handleSubmit}
        >
          <input
            onClick={() => {
              setCartMenu(false), setNavbarMenu(false);
            }}
            className="align-middle outline-none border-none rounded p-1 px-2 w-full sm:max-w-md sm:text-xl"
            type="text"
            placeholder="search product..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-3 text-3xl md:basis-2/5 md:justify-end">
          {user.role === 0 ? (
            <div
              onClick={() => setLogMenu(!logMenu)}
              className="relative cursor-pointer"
            >
              <div className="text-white bg-primaryDark w-7 h-7 text-lg font-medium p-2 flex justify-center items-center rounded-full">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
            </div>
          ) : user.role === 1 ? (
            <div
              className="relative cursor-pointer"
              onClick={() => setLogMenu(!logMenu)}
            >
              <div className="text-white bg-primaryDark w-7 h-7 text-lg font-medium p-2 flex justify-center items-center rounded-full">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              {logMenu && (
                <div className="absolute text-lg w-56 z-40 right-0 text-start ">
                  <ul className="flex flex-col gap-2 rounded shadow-md bg-white p-5 mt-2">
                    <li>
                      <Link to="/admin">Mi perfil</Link>
                    </li>
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                      <Link>Configuración</Link>
                    </li>
                    <li>
                      <button onClick={() => setUser(null)}>Salir</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <span className="hidden md:flex gap-2">
              <Link to="/register" className="text-xl text-white">
                Creá tu cuenta
              </Link>
              <span className="text-xl text-white">/</span>
              <Link to="/login" className="text-xl text-white">
                Ingresá
              </Link>
            </span>
          )}
          <button onClick={handleCart}>
            {cartMenu ? (
              <TiTimes className="text-white" />
            ) : (
              <div className="relative">
                <RiShoppingBagLine className="text-white" />
                {cart.length > 0 && (
                  <span className="text-base font-bold absolute -bottom-2 -right-2 bg-primaryLight rounded-full w-6 h-6 flex justify-center items-center ">
                    {cart.length}
                  </span>
                )}
              </div>
            )}
          </button>
          <button onClick={handleMenu}>
            {navbarMenu ? (
              <TiTimes className="text-white md:hidden" />
            ) : (
              <HiMenu className="font-bold text-white md:hidden" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

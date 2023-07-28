import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { RiShoppingBagLine } from 'react-icons/ri';
import { HiMenu } from 'react-icons/hi';
import { TiTimes } from 'react-icons/ti';
import NavbarMenu from './NavbarMenu';
import CartMenu from './CartMenu';

function Navbar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');

  const [inputSearch, setInputSearch] = useState(q ?? '');
  const [navbarMenu, setNavbarMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${inputSearch}&page=1`);
  };

  useEffect(() => {
    if (q !== inputSearch) {
      setInputSearch('');
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
        <Link className="md:basis-1/3" to="/">
          <h3 className="text-white font-bold w-full flex text-lg gap-2 sm:text-2xl">
            <span>Duck</span>
            <span>Shoes</span>
          </h3>
        </Link>
        <form
          className="w-full flex justify-center md:basis-1/3"
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
        <div className="flex items-center gap-3 text-3xl md:basis-1/3 md:justify-end md:gap-0">
          <button onClick={handleCart}>
            {cartMenu ? (
              <TiTimes className="text-white" />
            ) : (
              <RiShoppingBagLine className="text-white" />
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

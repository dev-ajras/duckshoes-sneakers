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
  const [cartMenu, setCartMenu] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${inputSearch}`);
  };

  useEffect(() => {
    if (q !== inputSearch) {
      setInputSearch('');
    }
  }, [q]);

  const handleMenu = () => {
    setCartMenu(false)
    setNavbarMenu(!navbarMenu);
  };

  const handleCart = () => {
    setNavbarMenu(false)
    setCartMenu(!cartMenu)
  }

  return (
    <header className=" flex flex-col justify-center bg-background p-2 h-14 fixed w-full z-40 top-6">
      <NavbarMenu navbarMenu={navbarMenu} setNavbarMenu={setNavbarMenu} />
      <CartMenu cartMenu={cartMenu} setCartMenu={setCartMenu} />
      <nav className="flex justify-between w-full">
        <Link to="/">
          <h3 className="text-white font-bold text-lg text-center">
            Duck Shoes
          </h3>
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            onClick={() => {setCartMenu(false), setNavbarMenu(false)}}
            className="align-middle outline-none border-none rounded p-1 px-2"
            type="text"
            placeholder="Buscar producto..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            autoFocus
          />
        </form>
        <div className="flex items-center gap-2">
          <button onClick={handleCart}>
            {cartMenu ? <TiTimes className="text-white text-xl" /> : <RiShoppingBagLine className="text-white text-xl" /> }
          </button>
          <button onClick={handleMenu}>
            {navbarMenu ? (
              <TiTimes className="text-white text-xl" />
            ) : (
              <HiMenu className="font-bold text-white text-xl" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

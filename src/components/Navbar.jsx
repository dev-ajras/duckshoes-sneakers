import { Link, useNavigate } from 'react-router-dom';

import { BiShoppingBag } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import NavbarMenu from './NavbarMenu';

function Navbar() {
  const [inputSearch, setInputSearch] = useState('');
  const [navbarMenu, setNavbarMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${inputSearch}`);
    console.log(inputSearch);
  };

  const handleMenu = () => {
    setNavbarMenu(!navbarMenu);
  };

  return (
    <header className=" flex flex-col justify-center bg-background p-2 h-14">
      {navbarMenu && <NavbarMenu />}
      <nav className="flex justify-between w-full ">
        <Link to="/">
          <h3 className="text-white font-bold text-lg">Duck Shoes</h3>
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            className="align-middle outline-none border-none rounded p-1 px-2"
            type="text"
            placeholder="Buscar producto..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-2">
          <button onClick={handleMenu}>
            <GiHamburgerMenu className="text-white" />
          </button>
          <button>
            <BiShoppingBag className="text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

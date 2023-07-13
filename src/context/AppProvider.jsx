import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const favoriteAdd = (toFavorite) => {
    setFavorites([...favorites, toFavorite]);
  };

  const cartAdd = (toCart) => {
    setCart(...cart, toCart);
  };

  const cartRemove = (toCart) => {
    const newCart = cart.filter((oldCart) => oldCart.id !== toCart.id);
    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/sneakers.json');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const contextObj = {
    products,
    favorites,
    cart,
    favoriteAdd,
    cartAdd,
    cartRemove,
  };

  return (
    <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };

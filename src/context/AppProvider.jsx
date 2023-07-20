import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const favoritesHandler = (toFavorite) => {
    const found = favorites.find((fav) => fav === toFavorite);
    if (!found) {
      setFavorites([...favorites, toFavorite]);
    } else {
      setFavorites(favorites.filter((fav) => fav !== toFavorite));
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const cartAdd = (toCart) => {
    const found = cart.find((cartOld) => cartOld.id === toCart.id )
    if(!found) {
      setCart([...cart, toCart]);
    } else {
      const updatedCart = cart.map((cartObj) => cartObj.id === toCart.id ? {...cartObj, quantity: cartObj.quantity + 1 } : cartObj )
      setCart(updatedCart)
    }
  };

  const cartRemove = (toCart) => {
    const newCart = cart.filter((oldCart) => oldCart !== toCart);
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
    favoritesHandler,
    cartAdd,
    cartRemove,
  };

  return (
    <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || ''
  );
  const [navbarMenu, setNavbarMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || '';
    setUser(storedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const favoritesHandler = (toFavorite) => {
    const found = favorites.find(
      (fav) => fav.id === toFavorite.id && fav.color === toFavorite.color
    );
    if (!found) {
      setFavorites([...favorites, toFavorite]);
    } else {
      setFavorites(
        favorites.filter(
          (fav) => fav.id !== toFavorite.id || fav.color !== toFavorite.color
        )
      );
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const cartAdd = (toCart, newQuantity) => {
    const found = cart.find(
      (cartOld) => cartOld.id === toCart.id && cartOld.color === toCart.color
    );
    if (!found) {
      setCart([...cart, toCart]);
    } else {
      const updatedCart = cart.map((cartObj) =>
        cartObj.id === toCart.id
          ? {
              ...cartObj,
              quantity: cartObj.quantity + 1,
            }
          : cartObj
      );
      setCart(updatedCart);
    }
  };

  const cartHandler = (toCart, newQuantity) => {
    const found = cart.find(
      (cartOld) => cartOld.id === toCart.id && cartOld.color === toCart.color
    );
    if (!found) {
      setCart([...cart, { ...toCart, quantity: newQuantity }]);
    } else {
      const updatedCart = cart.map((cartObj) =>
        cartObj.id === toCart.id && cartObj.color === toCart.color
          ? {
              ...cartObj,
              quantity: newQuantity,
            }
          : cartObj
      );
      setCart(updatedCart);
    }
  };

  const cartRemove = (toCart) => {
    const foundQ = cart.find((cartOld) => cartOld.id === toCart.id).quantity;
    if (foundQ === 1) {
      const newCart = cart.filter((oldCart) => oldCart.id !== toCart.id);
      setCart(newCart);
    } else {
      const updatedCart = cart.map((cartObj) =>
        cartObj.id === toCart.id
          ? {
              ...cartObj,
              quantity: cartObj.quantity - 1,
            }
          : cartObj
      );
      setCart(updatedCart);
    }
  };

  const cartDelete = (toCart) => {
    const newCart = cart.filter(
      (oldCart) => oldCart.id !== toCart.id || oldCart.color !== toCart.color
    );
    setCart(newCart);
  };

  const cartFullClear = () => {
    setCart([]);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const baseUrl = 'https://www.ds.agenciagrvity.com/';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(baseUrl + 'products?page=1&pageSize=16');
      setProducts(response.data.products);
    } catch (error) {}
  };

  const contextObj = {
    products,
    favorites,
    cart,
    favoritesHandler,
    cartAdd,
    cartRemove,
    cartDelete,
    cartFullClear,
    user,
    setUser,
    navbarMenu,
    setNavbarMenu,
    cartMenu,
    setCartMenu,
    cartHandler,
  };

  return (
    <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };

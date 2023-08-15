import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("token" + token);
  }, [token]);

  const favoritesHandler = (toFavorite) => {
    const found = favorites.find((fav) => fav === toFavorite);
    if (!found) {
      setFavorites([...favorites, toFavorite]);
    } else {
      setFavorites(favorites.filter((fav) => fav !== toFavorite));
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const cartAdd = (toCart) => {
    const found = cart.find((cartOld) => cartOld.id === toCart.id);
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
    const newCart = cart.filter((oldCart) => oldCart.id !== toCart.id);
    setCart(newCart);
  };

  const cartFullClear = () => {
    setCart([]);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/sneakers.json");
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
    cartDelete,
    cartFullClear,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
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

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };

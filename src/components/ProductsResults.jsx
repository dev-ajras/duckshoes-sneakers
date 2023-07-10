import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import ProductCard from './ProductCard';

function ProductsResults() {
  const { q } = queryString.parse(location.search);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/sneakers.json');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Products results</div>
      <section className="grid grid-cols-2 p-2 gap-3">
        {products.slice(0, 20).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </>
  );
}

export default ProductsResults;

import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AppContext } from '../context/AppProvider';

function ProductsResults() {
  const { products } = useContext(AppContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = q
      ? products.filter((product) => product.name.includes(q))
      : products;
    setFilteredProducts(filtered);
  }, [q, products]);

  return (
    <>
      <h3 className="pt-2 mx-3 font-bold text-lg">
        {q ? `Results for "${q}" ` : 'Products'}
      </h3>
      <div className="grid grid-cols-2 p-3 gap-3">
        {filteredProducts.slice(0, 20).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        {filteredProducts.length === 0 && <div>No results for "{q}"</div>}
      </div>
    </>
  );
}

export default ProductsResults;

import React, { useContext } from 'react';
import queryString from 'query-string';

import ProductCard from './ProductCard';
import { ProductsContext } from '../context/ProductsProvider';

function ProductsResults() {
  const products = useContext(ProductsContext);
  const { q } = queryString.parse(location.search);

  return (
    <>
      <h3 className="mt-2 mx-2 font-bold text-lg">Products results</h3>
      <section className="grid grid-cols-2 p-2 gap-3">
        {products.slice(0, 20).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </>
  );
}

export default ProductsResults;

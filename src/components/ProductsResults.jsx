import React, { useContext, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AppContext } from '../context/AppProvider';

function ProductsResults() {
  const { products } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const qToFilter = q ? q.toLowerCase().trim().split(' ') : [];
    const filtered = q
      ? products.filter((product) =>
          qToFilter.every((syllable) =>
            product.name.toLowerCase().includes(syllable)
          )
        )
      : products;
    setFilteredProducts(filtered);
  }, [q, products]);
  return (
    <>
      <h3 className="pt-2 mx-3 font-bold text-lg">
        {q ? `Results for "${q}" ` : 'Products'}
      </h3>
      {filteredProducts.length === 0 ? (
        <div className="m-3 flex flex-col items-center">
          <h5 className="font-semibold text-lg bg-primaryLight px-3 p-1 mb-2">
            No results
          </h5>
          <p className="font-semibold">There are no matches with your search</p>
          <img
            className="w-80 mt-5"
            src="/assets/illustrations/searchEmpty.svg"
            alt="favoritesEmpty"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 p-3 gap-3">
            {filteredProducts.slice(0, 20).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ProductsResults;

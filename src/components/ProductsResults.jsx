import React, { useContext, useEffect, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AppContext } from '../context/AppProvider';

function ProductsResults() {
  const { products } = useContext(AppContext);

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const pageParam = Number(searchParams.get('page'))
  console.log(pageParam)


  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1)

  const productsPerPage = 20
  const lastItemIndex = productsPerPage * currentPage
  const firstItemIndex = lastItemIndex - productsPerPage

  const handleNextPage = (next) => {
    if (currentPage < filteredProducts.length / productsPerPage) {
      setCurrentPage(currentPage + next)
      q ? navigate(`/products?q=${q}&page=${currentPage}`) : navigate(`/products?page=${currentPage + next}`);
      window.scrollTo(0, 0);
    }
  }

  const handlePrevPage = (prev) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - prev)
      q ? navigate(`/products?q=${q}&page=${currentPage}`) : navigate(`/products?page=${currentPage - prev}`);
      window.scrollTo(0, 0);
    } 
  }

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
    window.scrollTo(0, 0);
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
            {filteredProducts.slice(firstItemIndex, lastItemIndex).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div>
            <button onClick={() => handlePrevPage(1)}>prev</button>
            <button>{currentPage}</button>
            <button onClick={() => handleNextPage(1)}>next</button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductsResults;

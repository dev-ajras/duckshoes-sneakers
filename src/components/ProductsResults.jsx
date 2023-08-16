import React, { useContext, useEffect, useState } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppProvider";

import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

function ProductsResults() {
  const { products } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const pageParam = Number(searchParams.get("page"));

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 24;
  const lastItemIndex = productsPerPage * currentPage;
  const firstItemIndex = lastItemIndex - productsPerPage;

  const handleNextPage = (next) => {
    if (currentPage < filteredProducts.length / productsPerPage) {
      setCurrentPage(currentPage + next);
      q
        ? navigate(`/products?q=${q}&page=${currentPage + next}`)
        : navigate(`/products?page=${currentPage + next}`);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = (prev) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - prev);
      q
        ? navigate(`/products?q=${q}&page=${currentPage - prev}`)
        : navigate(`/products?page=${currentPage - prev}`);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (pageParam) {
      setCurrentPage(pageParam);
    }
  }, [pageParam]);

  useEffect(() => {
    const qToFilter = q ? q.toLowerCase().trim().split(" ") : [];
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
    <article className="flex justify-center">
      <div className="m-3 sm:m-5 lg:max-w-6xl w-full">
        <h3 className="self-start mb-3 sm:mb-5 font-medium text-lg sm:text-2xl">
          {q ? `Results for "${q}" ` : "Products"}
        </h3>
        {filteredProducts.length === 0 ? (
          <div className="m-3 flex flex-col items-center sm:m-5 sm:mt-12">
            <h5 className="font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3">
              No results
            </h5>
            <p className="font-semibold">
              There are no matches for your search
            </p>
            <img
              className="w-80 mt-5 sm:mt-8 sm:w-96"
              src="/assets/illustrations/searchEmpty.svg"
              alt="favoritesEmpty"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts
                .slice(firstItemIndex, lastItemIndex)
                .map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
            <div className="m-3 mt-6 flex gap-3 justify-center items-center rounded-md sm:m-5 sm:mt-10 sm:gap-5">
              <button
                className={`${
                  currentPage === 1 && "opacity-0 pointer-events-none"
                } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
                onClick={() => handlePrevPage(1)}
              >
                <MdOutlineNavigateBefore />
              </button>
              <div className="flex justify-center p-2 text-xl bg-primaryDark rounded-lg text-white font-bold w-16 sm:p-3 sm:text-2xl sm:w-20">
                {currentPage}/
                {Math.ceil(filteredProducts.length / productsPerPage)}
              </div>
              <button
                className={`${
                  currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage) &&
                  "opacity-0 pointer-events-none"
                } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
                onClick={() => handleNextPage(1)}
              >
                <MdOutlineNavigateNext />
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default ProductsResults;

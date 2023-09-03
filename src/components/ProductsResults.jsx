import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

function ProductsResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const pageParam = Number(searchParams.get("page"));

  const [products, setProducts] = useState([]);
  const [nextProduct, setNextProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 16;

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}products?page=${currentPage}&pageSize=${productsPerPage}`
      );
      console.log(response);
      setLoading(false);
      setProducts(response.data.products);
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    try {
      const fetchNextProducts = async () => {
        setLoading(true);
        const response = await axios.get(
          `${baseUrl}products?page=${
            currentPage + 1
          }&pageSize=${productsPerPage}`
        );
        setNextProducts(response.data.products);
        console.log(response.status);
        if (response.status === 404) {
          console.log("40404040!");
        }
      };
      fetchNextProducts();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        console.log("40404040!");
      }
    }
  }, [currentPage]);

  const handleNextPage = (next) => {
    setCurrentPage(currentPage + next);
    q
      ? navigate(`/products?q=${q}&page=${currentPage + next}`)
      : navigate(`/products?page=${currentPage + next}`);
    window.scrollTo(0, 0);
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

  return (
    <article className="flex justify-center">
      <div className="m-3 sm:m-5 lg:max-w-6xl w-full">
        <h3 className="self-start mb-3 sm:mb-5 font-medium text-lg sm:text-2xl">
          Productos
        </h3>
        {loading === true ? (
          <div className="flex justify-center">
            <ImSpinner8 className="animate-spin w-12 h-12 mt-12 fill-primaryExtraDark" />
          </div>
        ) : products.length === 0 ? (
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
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
            <div className="m-3 mt-6 flex gap-3 justify-center items-center rounded-md sm:m-5 sm:mt-10 sm:gap-5">
              <button
                className={`${
                  currentPage === 1 && "hidden pointer-events-none"
                } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
                onClick={() => handlePrevPage(1)}
              >
                <MdOutlineNavigateBefore />
              </button>
              <div className="flex justify-center p-2 text-xl bg-primaryDark rounded-lg text-white font-bold w-16 sm:p-3 sm:text-2xl sm:w-20">
                {currentPage}
              </div>
              <button
                className={`${
                  nextProduct.length <= 0 && "hidden"
                }p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
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

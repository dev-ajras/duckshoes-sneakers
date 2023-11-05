import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BiSolidEdit } from "react-icons/bi";
import {
  MdDelete,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner8 } from "react-icons/im";

function AllProducts() {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const [adminProducts, setAdminProducts] = useState([]);
  const [adminNextProducts, setAdminNextProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 16;

  const tokenExpiredAlert = () =>
    toast.error("Tu sesión expiró, ingresa nuevamente", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const tokenExpired = () => {
    tokenExpiredAlert();
    setTimeout(() => {
      localStorage.removeItem("token");
      setUser("");
    }, 4000);
  };

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}products?page=${currentPage}&pageSize=${productsPerPage}`
        );
        setAdminProducts(response.data.products);
      } catch (error) {
        if (error.response.status === 403) {
          tokenExpired();
        }
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchNextProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}products?page=${
            currentPage + 1
          }&pageSize=${productsPerPage}`
        );
        if (response.status === 200) {
          setAdminNextProducts(response.data.products);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAdminNextProducts([]);
        } else {
          // console.log(error);
        }
      }
    };
    fetchNextProducts();
  }, [currentPage]);

  const handleNextPage = (next) => {
    setCurrentPage(currentPage + next);
    navigate(`/admin/todos-productos?page=${currentPage + next}`);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = (prev) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - prev);
      navigate(`/admin/todos-productos?page=${currentPage - prev}`);
      window.scrollTo(0, 0);
    }
  };

  const productDeletedAlert = () =>
    toast.success("Producto Eliminado", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(baseUrl + "products/" + productId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        setAdminProducts(
          adminProducts.filter((product) => product.id !== productId)
        );
        productDeletedAlert();
      }
    } catch (error) {
      if (error.response.status === 403) {
        tokenExpired();
      }
      // console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <ToastContainer />
      <div className='grid grid-cols-7 sm:grid-cols-9 bg-gray-50 p-3 sm:p-5 font-normal'>
        <div className='text-center col-span-2'>Imágen</div>
        <div className='text-center col-span-2'>Sku</div>
        <div className='text-center col-span-2'>Precio</div>
        <div className='hidden sm:block text-center col-span-2'>Estado</div>
      </div>
      {loading ? (
        <div className='flex justify-center bg-white min-h-screen'>
          <ImSpinner8 className='animate-spin w-12 h-12 mt-12 fill-primaryExtraDark' />
        </div>
      ) : adminProducts.length > 0 ? (
        adminProducts.map((product) => (
          <div
            key={product.id}
            className='grid grid-cols-7 sm:grid-cols-9 place-items-center bg-white p-2 mb-0.5'
          >
            <div className='flex justify-center items-center col-span-2'>
              <img
                className='w-16 h-16 sm:w-20 sm:h-20 object-contain'
                src={product.image}
                alt={product.sku}
              />
            </div>
            <div className='text-sm sm:text-base text-center font-normal col-span-2'>
              {product.sku}
            </div>
            <div className='md:text-lg font-normal text-center col-span-2'>
              ${parseInt(product.price).toLocaleString("es-ES")}
            </div>
            <div className='hidden sm:block text-center col-span-2'>
              {product.active && (
                <div className='flex justify-evenly items-center'>
                  <span className='bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm font-medium'>
                    Publicado
                  </span>
                </div>
              )}
            </div>
            <div className='flex gap-1 sm:gap-3'>
              <Link to={`/admin/editar-producto/${product.id}`}>
                <BiSolidEdit className='w-6 h-6 sm:w-7 sm:h-7 fill-black/80 md:hover:fill-black md:transition-colors' />
              </Link>
              <button onClick={() => deleteProduct(product.id)}>
                <MdDelete className='hidden md:block w-6 h-6 sm:w-7 sm:h-7 fill-red-600 md:hover:fill-red-700 md:hover:opacity-100 md:transition-colors' />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='p-3 flex flex-col items-center sm:p-5 sm:py-12 bg-white'>
          <h5 className='font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3'>
            No hay productos
          </h5>
          <Link to='/admin/agregar-producto' className='font-semibold'>
            Añadir producto +
          </Link>
        </div>
      )}
      <div className='bg-gray-50 p-5 flex gap-3 justify-center items-center sm:gap-5'>
        <button
          className={`${
            currentPage === 1 && "hidden pointer-events-none"
          } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
          onClick={() => handlePrevPage(1)}
        >
          <MdOutlineNavigateBefore />
        </button>
        <div className='flex justify-center p-2 text-xl bg-white rounded-lg ring-1 ring-primaryDark font-bold w-16 sm:p-3 sm:text-2xl'>
          {currentPage}
        </div>
        <button
          className={`${
            adminNextProducts.length === 0 && "hidden"
          } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
          onClick={() => handleNextPage(1)}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default AllProducts;

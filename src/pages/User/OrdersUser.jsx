import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner8 } from "react-icons/im";

function OrdersUser() {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const [userOrders, setUserOrders] = useState([]);
  const [userNextOrders, setUserNextOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 16;

  const tokenExpired = () =>
    toast.error("Tu sesión expiró, ingresa nuevamente", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const baseUrl = "https://www.ds.agenciagrvity.com/";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}orders?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserOrders(response.data.orders);
      } catch (error) {
        // console.log(error);
        if (error.response.status === 403) {
          tokenExpired();
          setTimeout(() => {
            localStorage.removeItem("token");
            setUser("");
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]);

  useEffect(() => {
    const fetchNextOrders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}orders?page=${currentPage + 1}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 200) {
          setUserNextOrders(response.data.orders);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setUserNextOrders([]);
        }
      }
    };
    fetchNextOrders();
  }, [currentPage]);

  const handleNextPage = (next) => {
    setCurrentPage(currentPage + next);
    navigate(`/user/todos-pedidos?page=${currentPage + next}`);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = (prev) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - prev);
      navigate(`/user/todos-pedidos?page=${currentPage - prev}`);
      window.scrollTo(0, 0);
    }
  };

  function formatearFecha(fecha) {
    const opciones = {
      year: "2-digit",
      month: "2-digit",
      day: "numeric",
    };

    const fechaFormateada = new Date(fecha).toLocaleDateString(
      "es-ES",
      opciones
    );

    return fechaFormateada;
  }

  return (
    <div className='shadow'>
      <ToastContainer />
      <div className='hidden md:grid grid-cols-9 bg-gray-100 p-5 font-normal'>
        <div className='text-center col-span-1'>Pedido</div>
        <div className='text-center col-span-2'>Imágen</div>
        <div className='text-center col-span-2'>Fecha</div>
        <div className='text-center col-span-2'>Total</div>
        <div className='text-center col-span-2'>Estado</div>
      </div>
      {loading ? (
        <div className='flex justify-center bg-white min-h-screen'>
          <ImSpinner8 className='animate-spin w-12 h-12 mt-12 fill-primaryExtraDark' />
        </div>
      ) : userOrders.length > 0 ? (
        userOrders.map((order) => (
          <Link
            to={`/user/pedido/${order.id}`}
            key={order.id}
            className='grid grid-cols-3 gap-y-1 md:grid md:grid-cols-9 place-items-center bg-white p-3 md:p-4 mb-0.5 md:hover:bg-slate-50 md:transition-colors'
          >
            <div className='hidden md:flex justify-center items-center md:col-span-1'>
              <span>#{order.id}</span>
            </div>
            <div className='flex items-center text-center col-start-1 row-start-1 row-span-3 md:row-span-1 h-full md:col-start-2  md:col-span-2'>
              <img
                className='h-16 w-16 md:h-20 md:w-20 object-contain'
                src={order.products[0].images[0]}
                alt='imagen de pedido'
              />
            </div>
            <div className='place-self-start md:place-self-center md:text-center col-start-2 font-normal text-base md:col-start-4 md:col-span-2'>
              {formatearFecha(order.createdAt)}
            </div>
            <div className='place-self-start md:place-self-center text-lg font-medium md:text-center col-start-2 col-span-2 md:col-span-2'>
              ${parseInt(order.value).toLocaleString("es-ES")}
            </div>
            <div className='place-self-start md:place-self-center md:text-center col-start-2 row-start-1 col-span-2 md:col-start-8 md:col-span-2'>
              {order.status && (
                <div className='flex justify-evenly items-center font-medium'>
                  {order.status === "pending" ? (
                    <span className='bg-[#FFA625]/30 text-[#CB7800] py-2 px-3 rounded-sm md:font-medium'>
                      Pendiente
                    </span>
                  ) : order.status === "processing" ? (
                    <span className='bg-[#0033EA]/30 text-[#042bb9] py-2 px-3 rounded-sm md:font-medium'>
                      En proceso
                    </span>
                  ) : order.status === "completed" ? (
                    <span className='bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm md:font-medium'>
                      Despachado
                    </span>
                  ) : order.status === "cancelled" ? (
                    <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm md:font-medium'>
                      Cancelado
                    </span>
                  ) : (
                    <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm md:font-medium'>
                      Error
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <div className='p-3 flex flex-col items-center sm:p-5 bg-white'>
          <h5 className='font-medium md:text-lg bg-primaryLight px-3 p-1 sm:px-5 sm:p-2'>
            No hay pedidos
          </h5>
          <div className='flex flex-col md:font-normal md:text-lg mt-5 mb-3'>
            <span>1. Añade los productos al carrito</span>
            <span>2. Selecciona las cantidades</span>
            <span>3. Listo! Pulsa el botón "Encargar"</span>
          </div>
          <Link
            to='/products'
            className='md:hover:bg-primaryExtraDark md:transition-colors md:font-normal text-white mb-2 sm:mb-3 py-2 px-3 md:px-5 md:py-3 md:text-lg bg-primaryDark rounded'
          >
            Empezar
          </Link>
        </div>
      )}
      <div className='bg-gray-100 p-5 flex gap-3 justify-center items-center sm:gap-5'>
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
            userNextOrders.length === 0 && "hidden"
          } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
          onClick={() => handleNextPage(1)}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default OrdersUser;

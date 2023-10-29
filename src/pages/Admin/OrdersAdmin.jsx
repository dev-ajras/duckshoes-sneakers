import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ImSpinner8 } from "react-icons/im";

function OrdersAdmin() {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const [adminOrders, setAdminOrders] = useState([]);
  const [adminNextOrders, setAdminNextOrders] = useState([]);
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

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}orders/all?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setAdminOrders(response.data.orders);
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
  }, []);

  useEffect(() => {
    const fetchNextOrders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}orders/all?page=${currentPage + 1}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setAdminNextOrders(response.data.orders);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchNextOrders();
  }, []);

  const deleteProduct = async (e, productId) => {
    e.preventDefault();
    const response = await axios.delete(`${baseUrl}orders/${productId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(response);
    const foundOrders = adminOrders.filter((order) => order.id !== productId);
    setAdminOrders(foundOrders);
  };

  const handleNextPage = (next) => {
    setCurrentPage(currentPage + next);
    navigate(`/admin/todos-pedidos?page=${currentPage + next}`);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = (prev) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - prev);
      navigate(`/admin/todos-pedidos?page=${currentPage - prev}`);
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
      <div className='hidden md:grid grid-cols-12 bg-gray-100 p-5 font-normal'>
        <div className='text-center col-span-1'>Pedido</div>
        <div className='text-center col-span-2'>Cliente</div>
        <div className='text-center col-span-2'>Fecha</div>
        <div className='text-center col-span-2'>Total</div>
        <div className='text-center col-span-2'>Estado</div>
        <div className='text-center col-span-2'>Condición</div>
      </div>
      {loading ? (
        <div className='flex justify-center bg-white min-h-screen'>
          <ImSpinner8 className='animate-spin w-12 h-12 mt-12 fill-primaryExtraDark' />
        </div>
      ) : adminOrders.length > 0 ? (
        adminOrders.map((order) => (
          <Link
            to={`/admin/pedido/${order.id}`}
            className='relative grid grid-cols-3 gap-y-5 md:col-start-1 md:grid md:grid-cols-12 place-items-center bg-white px-3 py-8 md:p-4 mb-0.5 md:hover:bg-slate-50 md:transition-colors'
            key={order.id}
          >
            <div className='absolute top-0 left-0 p-3 md:relative md:p-0 text-sm sm:text-base flex justify-center items-center col-span-1'>
              <span className='font-normal md:text-lg'>#{order.id}</span>
            </div>
            <div className='text-sm sm:text-base col-start-1 row-span-2 md:row-span-1 flex flex-col justify-center text-center align-middle md:col-span-2 min-h-[60px] md:min-h-[100px] break-all'>
              <p className=''>{order.name}</p>
              <p className=''>{order.phone}</p>
            </div>
            <div className='text-sm sm:text-base text-center font-normal md:col-start-4 md:col-span-2'>
              {formatearFecha(order.createdAt)}
            </div>
            <div className='col-start-2 md:col-start-6 text-center md:col-span-2'>
              <span className='font-medium text-lg sm:text-xl'>
                ${parseInt(order.value).toLocaleString("es-ES")}
              </span>
            </div>
            <div className='col-start-3 row-start-1 md:col-start-8 text-sm sm:text-base text-center md:col-span-2'>
              {order.status === "pending" ? (
                <span className='bg-[#FFA625]/30 text-[#CB7800] py-2 px-3 rounded-sm font-medium'>
                  Pendiente
                </span>
              ) : order.status === "processing" ? (
                <span className='bg-[#0033EA]/30 text-[#042CB9] py-2 px-3 rounded-sm font-medium'>
                  En proceso
                </span>
              ) : order.status === "completed" ? (
                <span className='bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm font-medium'>
                  Despachado
                </span>
              ) : order.status === "cancelled" ? (
                <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium'>
                  Cancelado
                </span>
              ) : (
                <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium'>
                  Error
                </span>
              )}
            </div>
            <div className='col-start-3 row-start-2 md:row-start-1 md:col-start-10 text-sm sm:text-base text-center md:col-span-2 '>
              {order.active ? (
                <span className='bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm font-medium'>
                  Pagado
                </span>
              ) : (
                <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium'>
                  No pagado
                </span>
              )}
            </div>
            <button
              className='md:col-start-12 hidden md:block'
              onClick={(e) => deleteProduct(e, order.id)}
            >
              <MdDelete className='fill-red-600 md:hover:fill-red-700 md:hover:opacity-100 transition-opacity md:transition-colors w-7 h-7 opacity-75' />
            </button>
          </Link>
        ))
      ) : (
        <div className='p-3 flex flex-col items-center sm:p-5 sm:py-12 bg-white'>
          <h5 className='font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3'>
            No hay pedidos
          </h5>
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
            adminNextOrders.length === 0 && "hidden"
          } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
          onClick={() => handleNextPage(1)}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default OrdersAdmin;

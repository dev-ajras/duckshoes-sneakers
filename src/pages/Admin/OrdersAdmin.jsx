import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSpinner8 } from 'react-icons/im';

function OrdersAdmin() {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));

  const [orders, setOrders] = useState([]);
  const [ordersNext, setOrdersNext] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 16;

  const tokenExpired = () =>
    toast.error('Tu sesión expiró, ingresa nuevamente', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const baseUrl = 'https://www.api.duckshoes.com.ar/';

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
        console.log(response);

        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
        if (error.response.status === 403) {
          tokenExpired();
          setTimeout(() => {
            localStorage.removeItem('token');
            setUser('');
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const deleteProduct = async (e, productId) => {
    e.preventDefault();
    const response = await axios.delete(`${baseUrl}orders/${productId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const foundOrders = orders.filter((order) => order.id !== productId);
    setOrders(foundOrders);
    console.log(response);
  };

  //   useEffect(() => {
  //     const fetchNextProducts = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `${baseUrl}products?page=${
  //             currentPage + 1
  //           }&pageSize=${productsPerPage}`
  //         );
  //         if (response.status === 200) {
  //           setAdminNextProducts(response.data.products);
  //         } else {
  //           console.log(response);
  //         }
  //       } catch (error) {
  //         if (error.response && error.response.status === 404) {
  //           setAdminNextProducts([]);
  //         } else {
  //           console.log(error);
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchNextProducts();
  //   }, [currentPage]);

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

  // function formatearFecha(fecha) {
  //   const opciones = {
  //     year: '2-digit',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   };

  //   const fechaFormateada = new Date(fecha).toLocaleDateString(
  //     'es-ES',
  //     opciones
  //   );

  //   return fechaFormateada;
  // }

  return (
    <div className='shadow'>
      <ToastContainer />
      <div className='grid grid-cols-12 bg-gray-100 p-5 font-normal'>
        <div className='text-center col-span-1'>N° Pedido</div>
        <div className='text-center col-span-2'>Imágen</div>
        <div className='text-center col-span-2'>Fecha</div>
        <div className='text-center col-span-2'>Total</div>
        <div className='text-center col-span-2'>Estado</div>
        <div className='text-center col-span-2'>Condición</div>
      </div>
      {loading ? (
        <div className='flex justify-center bg-white min-h-screen'>
          <ImSpinner8 className='animate-spin w-12 h-12 mt-12 fill-primaryExtraDark' />
        </div>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <Link
            to={`/admin/pedido/${order.id}`}
            className='grid grid-cols-12 place-items-center bg-white p-2 mb-0.5 md:hover:bg-slate-50 md:transition-colors'
            key={order.id}
          >
            <div className='flex justify-center items-center col-span-1'>
              <span className='font-normal md:text-lg'>#{order.id}</span>
            </div>
            <div className='text-center col-span-2'>
              <img
                className='h-16 w-16 md:h-20 md:w-20 object-contain'
                src={order.products[0].images[0]}
                alt='imagen de pedido'
              />
            </div>
            <div className='text-center font-normal col-span-2'>
              {order.createdAt.slice(0, 10)}
            </div>
            <div className='text-center col-span-2'>
              <span className='font-normal md:text-lg'>
                ${parseInt(order.value).toLocaleString('es-ES')}
              </span>
            </div>
            <div className='text-center col-span-2'>
              {order.status === 'pending' ? (
                <span className='bg-[#FFA625]/30 text-[#CB7800] py-2 px-3 rounded-sm font-medium'>
                  Pendiente
                </span>
              ) : order.status === 'processing' ? (
                <span className='bg-[#0033EA]/30 text-[#042CB9] py-2 px-3 rounded-sm font-medium'>
                  En proceso
                </span>
              ) : order.status === 'completed' ? (
                <span className='bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm font-medium'>
                  Despachado
                </span>
              ) : order.status === 'cancelled' ? (
                <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium'>
                  Cancelado
                </span>
              ) : (
                <span className='bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium'>
                  Error
                </span>
              )}
            </div>
            <div className='text-center col-span-2 '>
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
            <button onClick={(e) => deleteProduct(e, order.id)}>
              <MdDelete className='fill-red-600 md:hover:fill-red-700 md:transition-colors w-7 h-7 opacity-75' />
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
            currentPage === 1 && 'hidden pointer-events-none'
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
            ordersNext.length === 0 && 'hidden'
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

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

  const [orders, setOrders] = useState([]);
  const [ordersNext, setOrdersNext] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);

  const productsPerPage = 16;

  const tokenExpired = () =>
    toast.error("Tu token expiró, volvé a logearte", {
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
          `${baseUrl}orders?page=${currentPage}`,
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

  return (
    <div className="shadow">
      <ToastContainer />
      <div className="grid grid-cols-10 bg-gray-100 p-5 font-normal">
        <div className="text-center col-span-2">N° Pedido</div>
        <div className="text-center col-span-2">Imágen</div>
        <div className="text-center col-span-2">Fecha</div>
        <div className="text-center col-span-2">Total</div>
        <div className="text-center col-span-2">Estado</div>
      </div>
      {loading ? (
        <div className="flex justify-center bg-white min-h-screen">
          <ImSpinner8 className="animate-spin w-12 h-12 mt-12 fill-primaryExtraDark" />
        </div>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <Link
            to={`/user/pedido/${order.id}`}
            key={order.id}
            className="grid grid-cols-10 place-items-center bg-white p-2 mb-0.5 md:hover:bg-slate-50 md:transition-colors"
          >
            <div className="flex justify-center items-center col-span-2">
              <span>#{order.id}</span>
            </div>
            <div className="text-center col-span-2">
              <img
                width={60}
                src="https://http2.mlstatic.com/D_Q_NP_632746-MLA45632512382_042021-AB.webp"
                alt="imagenEjemplo"
              />
            </div>
            <div className="text-center col-span-2">
              {order.createdAt.slice(0, 10)}
            </div>
            <div className="text-center col-span-2">
              ${parseInt(order.value).toLocaleString("es-ES")}
            </div>
            <div className="text-center col-span-2">
              {order.status && (
                <div className="flex justify-evenly items-center">
                  <span className="bg-[#FFA625]/40 text-[#CB7800] py-2 px-3 rounded-sm font-medium">
                    {order.status}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <div className="p-3 flex flex-col items-center sm:p-5 sm:py-12 bg-white">
          <h5 className="font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3">
            No hay pedidos
          </h5>
          <Link to="/admin/agregar-producto" className="font-semibold">
            Añadir pedido +
          </Link>
        </div>
      )}
      <div className="bg-gray-100 p-5 flex gap-3 justify-center items-center sm:gap-5">
        <button
          className={`${
            currentPage === 1 && "hidden pointer-events-none"
          } p-2 text-2xl bg-white rounded-full ring-1 ring-primaryDark sm:text-3xl`}
          onClick={() => handlePrevPage(1)}
        >
          <MdOutlineNavigateBefore />
        </button>
        <div className="flex justify-center p-2 text-xl bg-white rounded-lg ring-1 ring-primaryDark font-bold w-16 sm:p-3 sm:text-2xl">
          {currentPage}
        </div>
        <button
          className={`${
            ordersNext.length === 0 && "hidden"
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

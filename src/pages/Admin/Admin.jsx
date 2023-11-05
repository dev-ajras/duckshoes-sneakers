import {
  NavLink,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import AllProducts from "./AllProducts";
import Configuration from "./Configuration";
import AdminMain from "./AdminMain";
import OrdersAdmin from "./OrdersAdmin";
import OrderAdmin from "./OrderAdmin";

import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { IoReturnDownBack } from "react-icons/io5";
import { PiPlusBold } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";
import { RiShoppingBagLine } from "react-icons/ri";

function Admin() {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const returnPrev = () => {
    navigate(-1);
  };

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='p-5 w-full flex justify-center'>
        <div className='max-w-6xl w-full'>
          <button
            onClick={() => returnPrev()}
            className='flex justify-center items-center font-medium text-lg mb-3 sm:mb-5 sm:text-2xl bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors rounded-sm p-1.5 w-10 h-10 '
          >
            <IoReturnDownBack className='stroke-white w-full h-full' />
          </button>
          <div className='md:flex gap-3'>
            <article className='hidden md:block bg-white p-5 rounded shadow w-60'>
              <div className='flex flex-col gap-3'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                      : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                  }
                  to='/admin/agregar-producto'
                >
                  Agregar Producto
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                      : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                  }
                  to='/admin/todos-productos'
                >
                  Todos los Productos
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                      : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                  }
                  to='/admin/todos-pedidos'
                >
                  Pedidos
                </NavLink>
                <button
                  onClick={() => {
                    setUser(""), localStorage.removeItem("token");
                  }}
                  className='pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark text-left'
                >
                  Salir
                </button>
              </div>
            </article>
            <div className='md:hidden flex gap-3 mb-3'>
              <Link
                to='/admin/agregar-producto'
                className='w-10 h-10 p-2 flex justify-center text-primaryDark items-center bg-white rounded-sm shadow-sm'
              >
                <PiPlusBold className='w-full h-full' />
              </Link>
              <Link
                to='/admin/todos-productos'
                className='w-10 h-10 p-2 flex justify-center text-primaryDark items-center bg-white rounded-sm shadow-sm'
              >
                <TbShoe className='w-full h-full' />
              </Link>
              <Link
                to='/admin/todos-pedidos'
                className='w-10 h-10 p-2 flex justify-center text-primaryDark items-center bg-white rounded-sm shadow-sm'
              >
                <RiShoppingBagLine className='w-full h-full' />
              </Link>
            </div>
            <article className='w-full'>
              <Routes>
                <Route index element={<OrdersAdmin />} />
                <Route path='agregar-producto' element={<AddProduct />} />
                <Route
                  path='editar-producto/:productId'
                  element={<EditProduct />}
                />
                <Route path='todos-productos' element={<AllProducts />} />
                <Route path='pedido/:idPedido' element={<OrderAdmin />} />
                <Route path='todos-pedidos' element={<OrdersAdmin />} />
                <Route path='configuracion' element={<Configuration />} />
              </Routes>
              <Outlet />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;

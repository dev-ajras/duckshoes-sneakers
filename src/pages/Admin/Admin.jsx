import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import AllProducts from "./AllProducts";
import Orders from "./Orders";
import Configuration from "./Configuration";

function Admin() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-6xl m-5 w-full">
        <h3 className="text-start self-start place-self-start justify-self-start self  font-medium text-lg mb-3 sm:mb-5 sm:text-2xl">
          Admin
        </h3>
        <div className="flex gap-3">
          <article className="bg-white p-5 rounded shadow w-60">
            <div className="flex flex-col gap-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                    : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                }
                to="/admin/agregar-producto"
              >
                Agregar Producto
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                    : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                }
                to="/admin/editar-producto"
              >
                Editar Producto
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                    : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                }
                to="/admin/todos-productos"
              >
                Todos los Productos
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                    : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                }
                to="/admin/pedidos"
              >
                Pedidos
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                    : " pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                }
                to="/admin/configuracion"
              >
                Configuración
              </NavLink>
            </div>
          </article>
          <article className="w-full">
            <Routes>
              <Route path="agregar-producto" element={<AddProduct />} />
              <Route path="editar-producto" element={<EditProduct />} />
              <Route path="todos-productos" element={<AllProducts />} />
              <Route path="pedidos" element={<Orders />} />
              <Route path="configuracion" element={<Configuration />} />
            </Routes>
            <Outlet />
          </article>
        </div>
      </div>
    </section>
  );
}

export default Admin;

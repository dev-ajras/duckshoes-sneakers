import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import Order from "./Order";
import AllOrders from "./AllOrders";
import Configuration from "./Configuration";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

function Admin() {
  const { setUser } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="p-5 w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <h3 className="text-start self-start place-self-start justify-self-start self  font-medium text-lg mb-3 sm:mb-5 sm:text-2xl">
            Cliente
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
                  to="/user/pedido"
                >
                  Pedidos
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                      : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                  }
                  to="/user/mis-pedidos"
                >
                  Mis Pedidos
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                      : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
                  }
                  to="/user/configuracion"
                >
                  Configuración
                </NavLink>
                <button
                  className="pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark text-left"
                  onClick={() => {
                    setUser(""), localStorage.removeItem("token");
                  }}
                >
                  Salir
                </button>
              </div>
            </article>
            <article className="w-full">
              <Routes>
                <Route index element={<Order />} />
                <Route path="pedido" element={<Order />} />
                <Route path="mis-pedidos" element={<AllOrders />} />
                <Route path="configuracion" element={<Configuration />} />
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

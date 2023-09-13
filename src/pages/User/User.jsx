import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import OrdersUser from "./OrdersUser";
import Configuration from "./Configuration";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import OrderUser from "./OrderUser";

function Admin() {
  const { setUser } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="p-3 md:p-5 w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <h3 className="text-start self-start place-self-start justify-self-start self  font-medium text-lg mb-3 sm:mb-5 sm:text-2xl">
            Cliente
          </h3>
          <article className="w-full">
            <Routes>
              <Route index element={<OrdersUser />} />
              <Route path="pedido/:idPedido" element={<OrderUser />} />
              <Route path="mis-pedidos" element={<OrdersUser />} />
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

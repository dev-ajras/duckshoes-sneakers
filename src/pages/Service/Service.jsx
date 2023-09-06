import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import HowToBuy from "./HowToBuy";
import HowWeDeliver from "./HowWeDeliver";
import PaymentMethods from "./PaymentMethods";

function Service() {
  return (
    <section className="flex justify-center">
      <div className="md:flex gap-3 md:gap-5 m-3 sm:m-5 max-w-6xl">
        <article className="w-60 hidden md:block bg-white p-3 md:p-5 rounded-md">
          <h4 className="font-semibold text-xl mb-3">Servicio</h4>
          <ul className="flex flex-col gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                  : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
              }
              to="/service/how-to-buy"
            >
              Cómo comprar
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                  : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
              }
              to="/service/how-we-deliver"
            >
              Entregas
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primaryDark border-l-2 border-primaryDark pl-2"
                  : "pl-2 border-l-2 border-gray-300 hover:text-primaryDark hover:border-l-2 hover:border-primaryDark"
              }
              to="/service/payment-methods"
            >
              Métodos de pago
            </NavLink>
          </ul>
        </article>
        <article className="w-full flex justify-center bg-white rounded-md p-3 md:p-5">
          <Routes>
            <Route index element={<HowToBuy />} />
            <Route index path="how-to-buy" element={<HowToBuy />} />
            <Route path="how-we-deliver" element={<HowWeDeliver />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
          </Routes>
          <Outlet />
        </article>
      </div>
    </section>
  );
}

export default Service;

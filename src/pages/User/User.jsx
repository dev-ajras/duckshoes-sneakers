import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";

function User() {
  const { user, cart, products } = useContext(AppContext);

  const ordersFiltered = products.filter((cartItem) =>
    cart.some((productItem) => productItem.id === cartItem.id)
  );
  console.log(ordersFiltered);

  return (
    <section className="flex justify-center mt-10">
      <div className="flex max-w-6xl w-full gap-5">
        <article>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/user/mi-pefil">Mi perfil</Link>
            </li>
            <li>
              <Link to="/user/pedidos">Pedidos</Link>
            </li>
            <li>
              <Link to="/user/configuracion">Configuración</Link>
            </li>
            <li>
              <Link>Salir</Link>
            </li>
          </ul>
        </article>
        <article>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Medio de pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordersFiltered.map((order) => (
                <tr className="text-center" key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.nickname}</td>
                  <td>${order.retail_price_cents}</td>
                  <td>Efectivo</td>
                  <td>Pendiente</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </section>
  );
}

export default User;

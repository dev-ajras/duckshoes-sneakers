import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";

function User() {
  const { token, cart, products } = useContext(AppContext);

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
          <ul>
            {ordersFiltered.map((order) => (
              <li key={order.id}>
                <img
                  className="w-36"
                  src={order.grid_picture_url}
                  alt={order.name}
                />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default User;

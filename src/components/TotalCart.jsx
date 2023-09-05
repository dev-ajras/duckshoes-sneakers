import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import axios from "axios";

function TotalCart({ userReject }) {
  const { user, cart, cartFullClear } = useContext(AppContext);

  const calculateTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        total += Number(product.price) * cartItem.quantity;
      }
    }
    return total;
  };

  const cartToOrder = cart.map((cartItem) => ({
    id: cartItem.id,
    quantity: cartItem.quantity,
  }));

  console.log("aa", cartToOrder);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  const postOrder = async () => {
    const response = await axios.post(`${baseUrl}orders/create`, cartToOrder, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
  };

  const total = calculateTotal(cart);

  const handleOrder = () => {
    if (user.role !== 0) {
      console.log("reject");
      userReject();
    } else {
      postOrder();
      // cartFullClear();
    }
  };

  return (
    <div className="p-3 sm:p-5 ">
      <h3 className="font-medium text-lg sm:text-xl">Pedido</h3>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between">
          <span className="font-medium opacity-60">Subtotal</span>
          <span className="font-medium sm:text-lg">${total}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-60">Envío</span>
          <span className="font-medium sm:text-lg">Gratis</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-60">Descuento</span>
          <span className="font-medium sm:text-lg">$0</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-60">Total</span>
          <span className="font-medium sm:text-lg">${total}</span>
        </div>
        <button
          className="bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors font-semibold text-white p-3 rounded-sm mt-2 text-center text-lg"
          onClick={() => handleOrder()}
        >
          Encargar
        </button>
      </div>
    </div>
  );
}

export default TotalCart;

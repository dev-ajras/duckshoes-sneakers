import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

export default function AddRemoveButtons({ filteredProduct }) {
  const { cart, cartAdd, cartRemove, cartDelete, cartHandler } =
    useContext(AppContext);

  const [productQuantity, setProductQuantity] = useState(8);

  const handleAdd = (e, productId) => {
    e.preventDefault();
    const maxQ = cart.find((cartItem) => cartItem.id === productId).quantity;
    if (maxQ < 361) {
      cartAdd({ id: productId });
    } else {
      alert("360 es el máximo por medido");
    }
  };

  const handleRemove = (e, productId) => {
    e.preventDefault();
    cartRemove({ id: productId });
  };

  const handleRemoveAll = (e, productId) => {
    e.preventDefault();
    cartDelete({ id: productId });
  };

  // const productInCart = cart.find(
  //   (cartItem) => cartItem.id === filteredProductId
  // );
  // const quantityInCart = productInCart && productInCart.quantity;

  const quantityPerProduct = [
    8, 16, 24, 36, 48, 60, 72, 84, 96, 108, 120, 180, 240, 300, 360,
  ];

  const handleQuantity = (e) => {
    const currentQuantity = e.target.value;
    setProductQuantity(currentQuantity);
    cartHandler({ ...filteredProduct }, currentQuantity);
  };

  return (
    <div className="flex gap-3 sm:gap-5">
      <select
        onChange={(e) => handleQuantity(e, filteredProduct)}
        className="p-2 outline-none border rounded sm:px-4 sm:text-lg text-center font-normal"
        name="quantity"
        id="quantity"
        value={productQuantity}
      >
        {quantityPerProduct.map((quantity, idx) => (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        ))}
      </select>
      <button
        onClick={(e) => handleRemoveAll(e, filteredProduct.id)}
        className="flex items-center gap-3 px-3 py-1 outline outline-2 outline-body rounded bg-red-500 md:hover:bg-red-600 md:transition-colors text-white sm:gap-4 sm:px-4 sm:text-lg"
      >
        Delete
      </button>
    </div>
  );
}

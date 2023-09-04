import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export default function AddRemoveButtons({ filteredProductId }) {
  const { cart, cartAdd, cartRemove, cartDelete } = useContext(AppContext);

  const handleAdd = (e, productId) => {
    e.preventDefault();
    const maxQ = cart.find((cartItem) => cartItem.id === productId).quantity;
    if (maxQ < 5) {
      cartAdd({ id: productId });
    } else {
      alert("max quantity, no more stock");
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

  const productInCart = cart.find(
    (cartItem) => cartItem.id === filteredProductId
  );
  const quantityInCart = productInCart && productInCart.quantity;

  return (
    <div className="flex gap-3 sm:gap-5">
      <div className="flex justify-center items-center gap-3 px-3 py-1 outline outline-2 outline-body bg-white rounded-md font-semibold sm:gap-4 sm:px-4 sm:text-lg">
        <button onClick={(e) => handleRemove(e, filteredProductId)}>-</button>
        <span>{quantityInCart}</span>
        <button onClick={(e) => handleAdd(e, filteredProductId)}>+</button>
      </div>
      <button
        onClick={(e) => handleRemoveAll(e, filteredProductId)}
        className="flex items-center gap-3 px-3 py-1 outline outline-2 outline-body rounded-md bg-red-500 md:hover:bg-red-600 md:transition-colors text-white sm:gap-4 sm:px-4  sm:text-lg"
      >
        Delete
      </button>
    </div>
  );
}

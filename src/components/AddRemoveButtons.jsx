import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

export default function AddRemoveButtons({ filteredProductId }) {
  const { cart, cartAdd, cartRemove, cartRemoveAll } = useContext(AppContext);

  const handleAdd = (e, productId) => {
    e.preventDefault();
    const maxQ = cart.find((cartItem) => cartItem.id === productId).quantity;
    if (maxQ < 5) {
      cartAdd({ id: productId });
    } else {
      alert('max quantity, no more stock');
    }
  };

  const handleRemove = (e, productId) => {
    e.preventDefault();
    cartRemove({ id: productId });
  };

  const handleRemoveAll = (e, productId) => {
    e.preventDefault();
    cartRemoveAll({ id: productId });
  };

  return (
    <div className="flex gap-3 sm:gap-5">
      <div className="flex justify-center items-center gap-3 px-3 py-1 outline outline-2 outline-body bg-white rounded-md font-semibold sm:gap-5 sm:px-5 sm:text-xl">
        <button onClick={(e) => handleRemove(e, filteredProductId)}>-</button>
        <span>
          {cart.find((cartItem) => cartItem.id === filteredProductId).quantity}
        </span>
        <button onClick={(e) => handleAdd(e, filteredProductId)}>+</button>
      </div>
      <button
        onClick={(e) => handleRemoveAll(e, filteredProductId)}
        className="flex items-center gap-3 px-3 py-1 outline outline-2 outline-body rounded-md bg-red-500  text-white sm:gap-5 sm:px-5 sm:py-2 sm:text-xl"
      >
        Delete
      </button>
    </div>
  );
}

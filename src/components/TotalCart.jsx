import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Link } from 'react-router-dom';

function TotalCart({ filteredProducts, setCartMenu }) {
  const { cart } = useContext(AppContext);

  const calculateTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        total += (Number(product.retail_price_cents) / 100) * cartItem.quantity;
      }
    }
    return total;
  };

  const total = calculateTotal(filteredProducts);

  return (
    <div className="p-3 sm:p-5 ">
      <h3 className="font-semibold text-lg sm:text-xl">Your order</h3>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between">
          <span className="font-semibold opacity-60">Subtotal</span>
          <span className="font-semibold sm:text-lg">${total}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold opacity-60">Shipping</span>
          <span className="font-semibold sm:text-lg">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold opacity-60">Discount</span>
          <span className="font-semibold sm:text-lg">$0</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold opacity-60">Total</span>
          <span className="font-semibold sm:text-lg">${total}</span>
        </div>
        <Link
          to="/payment"
          className="bg-primaryDark font-semibold text-white p-3 rounded-sm mt-2 text-center text-lg"
          onClick={() => setCartMenu(false)}
        >
          Payment
        </Link>
      </div>
    </div>
  );
}

export default TotalCart;

import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function TotalCart({ filteredProducts }) {
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
    <div className="flex flex-col items-end p-10 sm:text-lg">
      <div>
        <span className="font-semibold">Subtotal: </span>
        <span>${total}</span>
      </div>
      <div>
        <span className="font-semibold">Shipping: </span>
        <span>Free</span>
      </div>
      <div>
        <span className="font-semibold">Discount: </span>
        <span>$0</span>
      </div>
      <div>
        <span className="font-semibold">Total: </span>
        <span>${total}</span>
      </div>
    </div>
  );
}

export default TotalCart;

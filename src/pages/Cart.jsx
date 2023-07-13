import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function Cart() {
  const { cart } = useContext(AppContext);

  return (
    <section>
      <h3 className="font-bold text-lg pt-2 mx-3">Cart</h3>
    </section>
  );
}

export default Cart;

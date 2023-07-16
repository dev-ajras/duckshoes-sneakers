import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function Cart() {
  const { cart } = useContext(AppContext);

  return (
    <section>
      <h3 className="font-bold text-lg m-3">Cart</h3>
    </section>
  );
}

export default Cart;

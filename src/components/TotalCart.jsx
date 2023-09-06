import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';

function TotalCart({ cartTo, userReject }) {
  const { user, cart, cartFullClear, setCartMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

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
    productId: cartItem.id,
    quantity: cartItem.quantity,
  }));

  const orderCreated = () =>
    toast.success('Pedido creado correctamente', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const navigate = useNavigate();

  const baseUrl = 'https://www.api.duckshoes.com.ar/';

  const postOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}orders/create`,
        { products: cartToOrder },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 201) {
        orderCreated();
        setTimeout(() => {
          navigate('/user');
          cartFullClear();
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const total = calculateTotal(cart);

  const handleOrder = () => {
    if (user.role !== 0) {
      userReject();
    } else {
      postOrder();
    }
  };

  return (
    <div className='p-3 sm:p-5 '>
      <ToastContainer />
      <h3 className='font-medium text-lg sm:text-xl'>Pedido</h3>
      <div className='flex flex-col mt-2'>
        <div className='flex justify-between'>
          <span className='font-medium opacity-60'>Subtotal</span>
          <span className='font-medium sm:text-lg'>${total}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium opacity-60'>Envío</span>
          <span className='font-medium sm:text-lg'>Gratis</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium opacity-60'>Descuento</span>
          <span className='font-medium sm:text-lg'>$0</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium opacity-60'>Total</span>
          <span className='font-medium sm:text-lg'>${total}</span>
        </div>
        {cartTo === 0 ? (
          <button
            className='flex justify-center items-center bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors font-semibold text-white p-3 rounded-sm mt-2 text-center text-lg'
            onClick={() => handleOrder()}
          >
            {loading ? <ImSpinner8 className='animate-spin' /> : 'Encargar'}
          </button>
        ) : (
          <Link
            to='/cart'
            className='bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors font-semibold text-white p-3 rounded-sm mt-2 text-center text-lg'
            onClick={() => setCartMenu(false)}
          >
            Ver carrito
          </Link>
        )}
      </div>
    </div>
  );
}

export default TotalCart;

import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";

function TotalCart({ userReject, tokenExpired }) {
  const { user, setUser, cart, cartFullClear } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const calculateTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const cartItem = cart.find(
        (item) => item.id === product.id && item.color === product.color
      );
      if (cartItem) {
        total += Number(product.price) * cartItem.quantity;
      }
    }
    return total;
  };

  const cartToOrder = cart.map((cartItem) => ({
    productId: cartItem.id,
    quantity: cartItem.quantity,
    color: cartItem.color,
  }));

  const orderCreated = () =>
    toast.success("Pedido creado correctamente", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const navigate = useNavigate();

  const baseUrl = "https://www.api.duckshoes.com.ar/";

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
          navigate("/user");
          cartFullClear();
        }, 4000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        tokenExpired();
        setTimeout(() => {
          localStorage.removeItem("token");
          setUser("");
        }, 3000);
      }
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const total = calculateTotal(cart);

  const handleOrder = () => {
    if (user.role !== 0) {
      userReject();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      postOrder();
    }
  };

  return (
    <div className='p-3 sm:p-5 md:p-8'>
      <ToastContainer />
      <h3 className='font-medium text-lg sm:text-xl'>Pedido</h3>
      <div className='flex flex-col mt-2'>
        {cart.map((cartItem, idx) => (
          <div className='flex justify-between items-end' key={idx}>
            <div>
              <span className='block font-medium opacity-60'>
                {cartItem.sku} x{cartItem.quantity}
              </span>
              <span className='text-sm block font-medium opacity-60'>
                {cartItem.color.toUpperCase()}
              </span>
            </div>
            <span className='font-medium opacity-60 sm:text-lg'>
              $
              {parseInt(cartItem.price * cartItem.quantity).toLocaleString(
                "es-ES"
              )}
            </span>
          </div>
        ))}
        <div className='border-t-2 my-2'></div>
        <div className='flex justify-between'>
          <span className='text-primaryExtraDark font-semibold sm:text-xl md:text-2xl'>
            Total
          </span>
          <span className='text-primaryExtraDark font-semibold sm:text-xl md:text-2xl'>
            {" "}
            ${total.toLocaleString("es-ES")}
          </span>
        </div>
        <button
          className='flex justify-center items-center bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors font-semibold text-white p-3 rounded-sm mt-2 text-center text-lg'
          onClick={() => handleOrder()}
        >
          {loading ? (
            <ImSpinner8 className='animate-spin w-7 h-7' />
          ) : (
            "Encargar"
          )}
        </button>
      </div>
    </div>
  );
}

export default TotalCart;

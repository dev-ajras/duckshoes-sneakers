import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import AddRemoveButtons from '../components/AddRemoveButtons';
import TotalCart from '../components/TotalCart';
import { ToastContainer, toast } from 'react-toastify';

import { IoReturnDownBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart } = useContext(AppContext);

  const navigate = useNavigate();

  const userReject = () =>
    toast.error('Esta función es solo para clientes', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const tokenExpired = () =>
    toast.error('Tu sesión expiró, ingresa nuevamente', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const returnPrev = () => {
    navigate(-1);
  };

  return (
    <section className='flex justify-center'>
      <ToastContainer className='mt-20' />
      <div className='max-w-6xl w-full m-3 sm:m-5'>
        <button
          onClick={() => returnPrev()}
          className='flex justify-center items-center font-medium text-lg mb-3 sm:mb-5 sm:text-2xl bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors rounded-sm p-1.5 w-10 h-10 '
        >
          <IoReturnDownBack className='stroke-white w-full h-full' />
        </button>
        <div>
          {cart.length > 0 ? (
            <div className='flex flex-col lg:flex-row lg:gap-5'>
              <div className='bg-white rounded-t-md lg:rounded-md w-full'>
                {cart.map((filteredProduct) => (
                  <div
                    key={`product${filteredProduct.id}-${filteredProduct.color}`}
                  >
                    <div className='flex gap-3 my-3 p-3 md:gap-5 md:my-5'>
                      <div className='flex items-center w-28 sm:w-36 md:w-48 p-3 md:p-5'>
                        <img
                          src={filteredProduct.images[filteredProduct.color][0]}
                          alt={filteredProduct.name}
                        />
                      </div>
                      <div className='w-full'>
                        <h4 className='font-semibold text-lg line-clamp-2 leading-6 sm:text-lg sm:leading-10'>
                          {filteredProduct.sku}
                        </h4>
                        <div className='flex flex-col md:flex-row sm:gap-2 font-semibold text-base my-1 md:gap-3 sm:text-lg'>
                          <p>
                            <span className='opacity-60'>Color: </span>
                            <span>{filteredProduct.color}</span>
                          </p>
                          <p>
                            <span className='opacity-60'>Unitario: </span>
                            <span>
                              $
                              {parseInt(filteredProduct.price).toLocaleString(
                                'es-ES'
                              )}
                            </span>
                          </p>
                        </div>
                        <div className='font-semibold text-xl mt-1 mb-3 sm:text-2xl'>
                          <span className='text-lg opacity-60'>
                            x{filteredProduct.quantity}
                          </span>
                          {''} $
                          {parseInt(
                            filteredProduct.price * filteredProduct.quantity
                          ).toLocaleString('es-ES')}
                        </div>
                        <AddRemoveButtons filteredProduct={filteredProduct} />
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div className='bg-white rounded-b-md lg:rounded-md h-full lg:w-[550px] lg:sticky md:top-28'>
                <TotalCart
                  userReject={userReject}
                  tokenExpired={tokenExpired}
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center m-2 sm:m-3 sm:mt-12'>
              <h5 className='bg-primaryLight text-lg font-normal md:font-medium px-2 py-1 mb-1 sm:px-3 sm:py-2 sm:mb-2'>
                Carrito vacío
              </h5>
              <p className='font-normal md:font-medium'>
                Agregá productos a tu carrito (+)
              </p>
              <img
                className='my-5 w-80 sm:my-8 sm:w-96'
                src='/assets/illustrations/cartEmpty.svg'
                alt='cartEmpty'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;

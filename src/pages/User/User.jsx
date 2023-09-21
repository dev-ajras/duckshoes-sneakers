import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import OrdersUser from './OrdersUser';
import Configuration from './Configuration';
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import OrderUser from './OrderUser';
import { IoReturnDownBack } from 'react-icons/io5';

function Admin() {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const returnPrev = () => {
    navigate(-1);
  };

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='p-3 md:p-5 w-full flex justify-center'>
        <div className='max-w-6xl w-full'>
          <button
            onClick={() => returnPrev()}
            className='flex justify-center items-center font-medium text-lg mb-3 sm:mb-5 sm:text-2xl bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors rounded-sm p-1.5 w-10 h-10 '
          >
            <IoReturnDownBack className='stroke-white w-full h-full' />
          </button>
          <article className='w-full'>
            <Routes>
              <Route index element={<OrdersUser />} />
              <Route path='pedido/:idPedido' element={<OrderUser />} />
              <Route path='mis-pedidos' element={<OrdersUser />} />
              <Route path='configuracion' element={<Configuration />} />
            </Routes>
            <Outlet />
          </article>
        </div>
      </div>
    </section>
  );
}

export default Admin;

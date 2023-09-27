import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion';

import { MdMail } from 'react-icons/md';

function RestablecerContraseña() {
  const [email, setEmail] = useState('');
  const [emailOk, setEmailOk] = useState(false);

  const emailSent = () =>
    toast.success('Correo de recuperación enviado', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const emailUserError = () =>
    toast.error('Correo electrónico incorrecto', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const emailServerError = () =>
    toast.error('Error al intentar recuperar la cuenta', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const handleForm = (e) => {
    e.preventDefault();
    postRecover();
  };

  const postRecover = () => {
    console.log('postRecover');
  };

  return (
    <section className='flex justify-center m-7 sm:m-14'>
      {!emailOk ? (
        <article className=' bg-white rounded-md shadow p-10 w-96'>
          <ToastContainer />
          <div className='mb-5 border-b-2 pb-2 border-primaryDark'>
            <h3 className='font-medium text-2xl text-primaryDark'>
              Restablecer contraseña
            </h3>
            <h4 className='font text-lg'>Introducir correo electrónico</h4>
          </div>
          <form onSubmit={handleForm} className='flex flex-col'>
            <label className='text-sm' htmlFor='email'>
              email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setFormData(setEmail(e.target.value));
              }}
              required
              id='email'
              type='email'
              placeholder='Correo electrónico'
              className='mb-5 border-b outline-none py-1'
            />

            <button className='md:hover:bg-primaryExtraDark md:transition-colors bg-primaryDark p-2 text-white rounded font-normal'>
              Restablecer
            </button>
          </form>
        </article>
      ) : (
        <article className='flex justify-center'>
          <div className='m-3 sm:m-5 max-w-6xl w-full'>
            <h3 className='text-center font-bold text-lg mb-3 sm:mb-5 sm:text-2xl'>
              Correo de recuperación enviado!
            </h3>
            <div className='flex flex-col items-center'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className='w-28 h-28 md:w-36 md:h-36 bg-sky-700 p-5 mt-5 mb-3 rounded-full'
              >
                <MdMail className='fill-white w-full h-full' />
              </motion.div>
              <h4 className='sm:text-xl font-semibold mt-2'>
                Verifica tu bandeja de entrada
              </h4>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default RestablecerContraseña;

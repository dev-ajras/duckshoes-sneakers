import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion';

import { AiFillCheckCircle } from 'react-icons/ai';

function RestablecerContraseñaForm() {
  const { token, userId } = useParams();

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);
  const [onBlurRepeatPassword, setOnBlurRepeatPassword] = useState(false);
  const [emailOk, setEmailOk] = useState(false);

  const validateRepeatPassword = (input) => {
    return password === input;
  };

  const handleRepeatPassword = (e) => {
    const currentRepeatPassword = e.target.value;
    setRepeatPassword(currentRepeatPassword);
    setIsRepeatPasswordValid(validateRepeatPassword(currentRepeatPassword));
  };

  const handleForm = (e) => {
    e.preventDefault();
    postChange();
  };

  const postChange = () => {
    console.log('post');
  };

  const emailSent = () =>
    toast.success('Contraseña restaurada con éxito', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const emailUserError = () =>
    toast.error('Correo electrónico inválido', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const emailServerError = () =>
    toast.error('Error al intentar recuperar la contraseña', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  console.log('toke :', token);
  console.log('userId :', userId);

  return (
    <section className='flex justify-center m-7 sm:m-14'>
      {!emailOk ? (
        <article className=' bg-white rounded-md shadow p-10 w-96'>
          <ToastContainer />
          <div className='mb-5 border-b-2 pb-2 border-primaryDark'>
            <h3 className='font-medium text-2xl text-primaryDark'>
              Restablecer contraseña
            </h3>
            <h4 className='font text-lg'>Introducir contraseña</h4>
          </div>
          <form onSubmit={handleForm} className='flex flex-col'>
            <label className='text-sm' htmlFor='password'>
              contraseña
            </label>
            <input
              value={password}
              onChange={(e) => {
                setFormData(setPassword(e.target.value));
              }}
              required
              id='password'
              type='password'
              placeholder='Contraseña'
              className='mb-2 border-b outline-none py-1'
            />
            <label className='text-sm mt-5' htmlFor='repeatPassword'>
              repetir contraseña
            </label>
            <input
              value={repeatPassword}
              onChange={(e) => {
                handleRepeatPassword(e);
              }}
              required
              id='repeatPassword'
              type='password'
              placeholder='Repetir contraseña'
              className='border-b outline-none py-1'
              onBlur={() => {
                setOnBlurRepeatPassword(true);
              }}
            />
            {!isRepeatPasswordValid &&
              onBlurRepeatPassword &&
              repeatPassword && (
                <p className='text-sm mt-1 text-red-600'>
                  Las contraseñas no coinciden
                </p>
              )}
            <button className='md:hover:bg-primaryExtraDark md:transition-colors bg-primaryDark p-2 text-white rounded font-normal'>
              Restablecer
            </button>
          </form>
        </article>
      ) : (
        <article className='flex justify-center'>
          <div className='m-3 sm:m-5 max-w-6xl w-full'>
            <h3 className='text-center font-bold text-lg mb-3 sm:mb-5 sm:text-2xl'>
              Contraseña restaurada con éxito
            </h3>
            <div className='flex flex-col items-center'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className='w-28 h-28 md:w-36 md:h-36 bg-green-700 p-5 mt-5 mb-3 rounded-full'
              >
                <AiFillCheckCircle className='fill-white w-full h-full' />
              </motion.div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default RestablecerContraseñaForm;

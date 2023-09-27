import { useContext, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { user, setUser } = useContext(AppContext);

  const initialState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleForm = (e) => {
    e.preventDefault();
    userRegister();
  };

  const baseUrl = 'https://www.api.duckshoes.com.ar/';

  const navigate = useNavigate();

  const userWrong = (message) =>
    toast.error(message, {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const userRegister = async () => {
    try {
      const { email, password } = formData;
      const response = await axios.post(baseUrl + 'users/login', {
        email,
        password,
      });
      console.log(response);
      setFormData(initialState);
      if (response.data.role === 0) {
        setUser(response.data);
        navigate('/user');
      } else if (response.data.role === 1) {
        setUser(response.data);
        navigate('/admin');
      }
    } catch (error) {
      if (error.response.status === 400) {
        userWrong(error.response.data.error);
      }
      // console.log(error);
    }
  };

  if (user.role !== undefined && user.role !== null) {
    return <Navigate to='/products' replace />;
  }

  return (
    <section className='flex justify-center m-7 sm:m-14'>
      <article className=' bg-white rounded-md shadow p-10 w-96'>
        <ToastContainer />
        <div className='mb-5 border-b-2 pb-2 border-primaryDark'>
          <h3 className='font-medium text-3xl text-primaryDark'>Ingresar</h3>
          <h4 className='font text-lg'>Introducir cuenta</h4>
        </div>
        <form onSubmit={handleForm} className='flex flex-col'>
          <label className='text-sm' htmlFor='email'>
            email
          </label>
          <input
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
            id='email'
            type='email'
            placeholder='Correo electrónico'
            className='mb-5 border-b outline-none py-1'
          />
          <label className='text-sm' htmlFor='password'>
            contraseña
          </label>
          <input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
            id='password'
            type='password'
            placeholder='Contraseña'
            className='mb-2 border-b outline-none py-1'
          />
          <Link
            to='/restablecer-contraseña'
            className='flex justify-end text-sm text-black font-normal mb-3'
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <button className='md:hover:bg-primaryExtraDark md:transition-colors bg-primaryDark p-2 text-white rounded font-normal'>
            Ingresar
          </button>
        </form>
        <p className='font-light mt-2'>
          ¿No estas registrado?{' '}
          <Link to='/register' className='font-normal'>
            Registrarse
          </Link>
        </p>
      </article>
    </section>
  );
}

export default Login;

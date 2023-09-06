import { useContext, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppProvider';

function RegisterAdmin() {
  const { user } = useContext(AppContext);

  const initialState = {
    name: '',
    email: '',
    key: '',
    password: '',
    repeatPassword: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialState);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid && isRepeatPasswordValid) {
      userRegister();
    }
  };

  const baseUrl = 'https://www.api.duckshoes.com.ar/';

  const navigate = useNavigate();

  const userRegister = async () => {
    const { name, email, key, password, phone } = formData;
    const response = await axios.post(baseUrl + 'users/register-admin', {
      name,
      email,
      key,
      password,
      phone,
    });
    console.log(response);
    response.data && userRegistered();
    setTimeout(() => {
      response.data && navigate('/login');
    }, 2000);
  };

  const validateName = (input) => {
    const minlength = 3;
    const maxLength = 32;
    const haveSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(input);

    return (
      input.length >= minlength && input.length <= maxLength && !haveSpecialChar
    );
  };

  const handleName = (e) => {
    const currentName = e.target.value;
    setFormData({ ...formData, name: currentName });
    setIsNameValid(validateName(currentName));
  };

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
  };

  const handleEmail = (e) => {
    const currentEmail = e.target.value;
    setFormData({ ...formData, email: currentEmail });
    setIsEmailValid(validateEmail(currentEmail));
  };

  const validateKey = (input) => {
    const minlength = 3;
    const maxLength = 32;
    const haveSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(input);

    return (
      input.length >= minlength && input.length <= maxLength && !haveSpecialChar
    );
  };

  const handleKey = (e) => {
    const currentKey = e.target.value;
    setFormData({ ...formData, key: currentKey });
    setIsKeyValid(validateKey(currentKey));
  };

  const validatePassword = (input) => {
    const minLength = 6;
    const maxLength = 128;
    const haveUppercase = /[A-Z]/.test(input);
    const haveLowercase = /[a-z]/.test(input);
    const haveNumber = /[0-9]/.test(input);
    const haveSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(input);

    return (
      input.length >= minLength &&
      input.length <= maxLength &&
      haveUppercase &&
      haveLowercase &&
      haveNumber &&
      !haveSpecialChar
    );
  };

  const handlePassword = (e) => {
    const currentPassword = e.target.value;
    setFormData({ ...formData, password: currentPassword });
    setIsPasswordValid(validatePassword(currentPassword));
  };

  const validateRepeatPassword = (input) => {
    return formData.password === input;
  };

  const handleRepeatPassword = (e) => {
    const currentRepeatPassword = e.target.value;
    setFormData({ ...formData, repeatPassword: currentRepeatPassword });
    setIsRepeatPasswordValid(validateRepeatPassword(currentRepeatPassword));
  };

  const validatePhone = (input) => {
    const minlength = 10;
    const maxlength = 16;
    const haveSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(input);

    return (
      input.length >= minlength && input.length <= maxlength && !haveSpecialChar
    );
  };

  const handlePhone = (e) => {
    const currentPhone = e.target.value;
    setFormData({ ...formData, phone: currentPhone });
    setIsPhoneValid(validatePhone(currentPhone));
  };

  const [onBlurName, setOnBlurName] = useState(false);
  const [onBlurEmail, setOnBlurEmail] = useState(false);
  const [onBlurKey, setOnBlurKey] = useState(false);
  const [onBlurPassword, setOnBlurPassword] = useState(false);
  const [onBlurRepeatPassword, setOnBlurRepeatPassword] = useState(false);
  const [onBlurPhone, setOnBlurPhone] = useState(false);

  const userRegistered = () =>
    toast.success('Cuenta creada exitosamente!', {
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  if (user.role) {
    return <Navigate to='/' replace />;
  }

  return (
    <section className='flex justify-center m-7 sm:m-14'>
      <article className=' bg-white rounded-md shadow p-10 w-96'>
        <div className='mb-5 border-b-2 pb-2 border-primaryDark'>
          <h3 className='font-medium text-3xl text-primaryDark'>Registrarse</h3>
          <h4 className='font text-lg'>Crear cuenta</h4>
        </div>
        <ToastContainer />
        <form onSubmit={handleForm} className='flex flex-col'>
          <label className='text-sm' htmlFor='name'>
            nombre
          </label>
          <input
            value={formData.name}
            onChange={(e) => {
              handleName(e);
            }}
            required
            id='name'
            type='text'
            placeholder='Nombre de usuario'
            className='border-b outline-none py-1'
            onBlur={() => {
              setOnBlurName(true);
            }}
          />
          {!isNameValid && onBlurName && formData.name && (
            <p className='text-sm mt-1 text-red-600'>
              Debe tener entre 3 y 32 caracteres. Evita caracteres especiales
              !@#$%^&*()_+
              {}[]:;<>,.?~/-.</>
            </p>
          )}
          <label className='text-sm mt-5' htmlFor='email'>
            email
          </label>
          <input
            value={formData.email}
            onChange={(e) => {
              handleEmail(e);
            }}
            required
            id='email'
            type='email'
            placeholder='Correo electrónico'
            className='border-b outline-none py-1'
            onBlur={() => {
              setOnBlurEmail(true);
            }}
          />
          {!isEmailValid && onBlurEmail && formData.email && (
            <p className='text-sm mt-1 text-red-600'>
              Ingresar dirección de correo electrónico válida, por ejemplo:
              ejemplo@dominio.com{' '}
            </p>
          )}
          <label className='text-sm mt-5' htmlFor='key'>
            admin key
          </label>
          <input
            value={formData.key}
            onChange={(e) => {
              handleKey(e);
            }}
            required
            id='key'
            type='password'
            placeholder='Clave de admin'
            className='border-b outline-none py-1'
            onBlur={() => {
              setOnBlurKey(true);
            }}
          />
          {!isKeyValid && onBlurKey && formData.key && (
            <p className='text-sm mt-1 text-red-600'>
              Clave secreta. Tiene entre 3 y 32 caracteres, sin caracteres
              especiales !@#$%^&*()_+
              {}[]:;<>,.?~/-.</>
            </p>
          )}
          <label className='text-sm mt-5' htmlFor='password'>
            contraseña
          </label>
          <input
            value={formData.password}
            onChange={(e) => {
              handlePassword(e);
            }}
            required
            id='password'
            type='password'
            placeholder='Contraseña'
            className='border-b outline-none py-1'
            onBlur={() => setOnBlurPassword(true)}
          />
          {!isPasswordValid && onBlurPassword && formData.password && (
            <p className='text-sm mt-1 text-red-600'>
              Debe tener entre 6 y 128 caracteres, al menos una mayúscula, una
              minúscula y un número. Evita caracteres especiales !@#$%^&*()_+
              {}[]:;<>,.?~/-.</>
            </p>
          )}
          <label className='text-sm mt-5' htmlFor='repeatPassword'>
            repetir contraseña
          </label>
          <input
            value={formData.repeatPassword}
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
            formData.repeatPassword && (
              <p className='text-sm mt-1 text-red-600'>
                Las contraseñas no coinciden
              </p>
            )}
          <label className='text-sm mt-5' htmlFor='phone'>
            teléfono
          </label>
          <input
            value={formData.phone}
            onChange={(e) => {
              handlePhone(e);
            }}
            required
            id='phone'
            type='text'
            placeholder='Número de celular'
            className='border-b outline-none py-1'
            onBlur={() => {
              setOnBlurPhone(true);
            }}
          />
          {!isPhoneValid && onBlurPhone && formData.phone && (
            <p className='text-sm mt-1 text-red-600'>
              Debe tener entre 10 y 16 números, por ejemplo: 1122334455
            </p>
          )}
          <button className='bg-primaryDark p-2 mt-5 text-white rounded font-normal'>
            Crear cuenta
          </button>
        </form>
        <p className='font-light mt-2'>
          ¿Ya estas registrado?{' '}
          <Link to='/login' className='font-normal'>
            Ingresar
          </Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterAdmin;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const initialState = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid && isRepeatPasswordValid) {
      userRegister();
    }
  };

  const baseUrl = "https://conexachallenge-elnd-dev.fl0.io/";

  const navigate = useNavigate();

  const userRegister = async () => {
    const { email, password } = formData;
    const response = await axios.post(baseUrl + "users/register", {
      email,
      password,
    });
    console.log(response);
    setFormData(initialState);
    response.data && navigate("/login");
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

  // console.log("ísEmailValid: " + isEmailValid);
  // console.log("isPasswordValid: " + isPasswordValid);
  // console.log("isPasswordRepeatValid: " + isRepeatPasswordValid);

  const [onBlurEmail, setOnBlurEmail] = useState(false);
  const [onBlurPassword, setOnBlurPassword] = useState(false);
  const [onBlurRepeatPassword, setOnBlurRepeatPassword] = useState(false);

  return (
    <section className="flex justify-center m-7 sm:m-14">
      <article className=" bg-white rounded-md shadow p-10 w-96">
        <div className="mb-5 border-b-2 pb-2 border-primaryDark">
          <h3 className="font-medium text-3xl text-primaryDark">Registrarse</h3>
          <h4 className="font text-lg">Crear cuenta</h4>
        </div>
        <form onSubmit={handleForm} className="flex flex-col">
          <label className="text-sm" htmlFor="email">
            email
          </label>
          <input
            value={formData.email}
            onChange={(e) => {
              handleEmail(e);
            }}
            required
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="border-b outline-none py-1"
            onBlur={() => {
              setOnBlurEmail(true);
            }}
          />
          {!isEmailValid && onBlurEmail && formData.email && (
            <p className="text-sm mt-1 text-red-600">
              Ingresar dirección de correo electrónico válida, por ejemplo:
              ejemplo@dominio.com{" "}
            </p>
          )}
          <label className="text-sm mt-5" htmlFor="password">
            contraseña
          </label>
          <input
            value={formData.password}
            onChange={(e) => {
              handlePassword(e);
            }}
            required
            id="password"
            type="password"
            placeholder="Contraseña"
            className="border-b outline-none py-1"
            onBlur={() => setOnBlurPassword(true)}
          />
          {!isPasswordValid && onBlurPassword && formData.password && (
            <p className="text-sm mt-1 text-red-600">
              Debe tener entre 6 y 128 caracteres, al menos una mayúscula, una
              minúscula y un número. Evita caracteres especiales !@#$%^&*()_+
              {}[]:;<>,.?~/-.</>
            </p>
          )}
          <label className="text-sm mt-5" htmlFor="repeatPassword">
            repetir contraseña
          </label>
          <input
            value={formData.repeatPassword}
            onChange={(e) => {
              handleRepeatPassword(e);
            }}
            required
            id="repeatPassword"
            type="password"
            placeholder="Repetir contraseña"
            className="border-b outline-none py-1"
            onBlur={() => {
              setOnBlurRepeatPassword(true);
            }}
          />
          {!isRepeatPasswordValid &&
            onBlurRepeatPassword &&
            formData.repeatPassword && (
              <p className="text-sm mt-1 text-red-600">
                Las contraseñas no coinciden
              </p>
            )}
          <button className="bg-primaryDark p-2 mt-5 text-white rounded font-normal">
            Crear cuenta
          </button>
        </form>
        <p className="font-light mt-2">
          ¿Ya estas registrado?{" "}
          <Link to="/login" className="font-normal">
            Ingresar
          </Link>
        </p>
      </article>
    </section>
  );
}

export default Register;

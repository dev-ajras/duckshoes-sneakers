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

  const handleForm = (e) => {
    e.preventDefault();
    userRegister();
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
              setFormData({ ...formData, email: e.target.value });
            }}
            required
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="mb-5 border-b outline-none py-1"
          />
          <label className="text-sm" htmlFor="password">
            contraseña
          </label>
          <input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
            id="password"
            type="password"
            placeholder="Contraseña"
            className="mb-5 border-b outline-none py-1"
          />
          <label className="text-sm" htmlFor="repeatPassword">
            repetir contraseña
          </label>
          <input
            value={formData.repeatPassword}
            onChange={(e) => {
              setFormData({ ...formData, repeatPassword: e.target.value });
            }}
            required
            id="repeatPassword"
            type="password"
            placeholder="Repetir contraseña"
            className="mb-5 border-b outline-none py-1"
          />
          <button className="bg-primaryDark p-2 text-white rounded font-normal">
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

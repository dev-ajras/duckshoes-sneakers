import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppProvider";

function Login() {
  const { setToken } = useContext(AppContext);

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleForm = (e) => {
    e.preventDefault();
    userRegister();
  };

  const baseUrl = "https://conexachallenge-elnd-dev.fl0.io/";

  // const navigate = useNavigate();

  const userRegister = async () => {
    const { email, password } = formData;
    const response = await axios.post(baseUrl + "users/login", {
      email,
      password,
    });
    console.log(response);
    setFormData(initialState);
    if (response.status === 200) {
      setToken(response.data.token);
    }
  };

  return (
    <section className="flex justify-center m-7 sm:m-14">
      <article className=" bg-white rounded-md shadow p-10 w-96">
        <div className="mb-5">
          <h3 className="font-medium text-3xl">Ingresar</h3>
          <h4 className="font text-xl">Introducir cuenta</h4>
        </div>
        <form onSubmit={handleForm} className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="mb-5 border-b"
          />
          <label htmlFor="password">contraseña</label>
          <input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
            id="password"
            type="password"
            placeholder="Contraseña"
            className="mb-5 border-b"
          />
          <button className="bg-primaryDark p-2 text-white rounded">
            Ingresar
          </button>
        </form>
      </article>
    </section>
  );
}

export default Login;

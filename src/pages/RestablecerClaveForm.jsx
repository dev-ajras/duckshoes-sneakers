import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ImSpinner8 } from "react-icons/im";

import axios from "axios";

function RestablecerClaveForm() {
  const { user } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyParam = searchParams.get("key");
  const userParam = searchParams.get("user");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);
  const [onBlurRepeatPassword, setOnBlurRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateRepeatPassword = (input) => {
    return password === input;
  };

  const handleRepeatPassword = (e) => {
    const currentRepeatPassword = e.target.value;
    setRepeatPassword(currentRepeatPassword);
    setIsRepeatPasswordValid(validateRepeatPassword(currentRepeatPassword));
  };

  const emailSuccessAlert = () =>
    toast.success("Contraseña restaurada con éxito", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const emailServerError = () =>
    toast.error("Error al intentar restaurar la cuenta", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const handleForm = (e) => {
    e.preventDefault();
    postChange();
  };

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  const navigate = useNavigate();

  const postChange = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}users/change-password?key=${keyParam}&user=${userParam}`,
        {
          password: password,
        }
      );
      if (response.status === 200) {
        emailSuccessAlert();
        setTimeout(() => {
          navigate("/login", { replace });
        }, 4000);
      }
    } catch (error) {
      if (error.response) {
        emailServerError();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center m-7 sm:m-14">
      <article className=" bg-white rounded-md shadow p-10 w-96">
        <ToastContainer />
        <div className="mb-5 border-b-2 pb-2 border-primaryDark">
          <h3 className="font-medium text-2xl text-primaryDark">
            Restablecer contraseña
          </h3>
          <h4 className="font text-lg">Introducir contraseña</h4>
        </div>
        <form onSubmit={handleForm} className="flex flex-col">
          <label className="text-sm" htmlFor="password">
            contraseña
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            id="password"
            type="password"
            placeholder="Contraseña"
            className="mb-2 border-b outline-none py-1"
          />
          <label className="text-sm" htmlFor="repeatPassword">
            repetir contraseña
          </label>
          <input
            value={repeatPassword}
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
          {!isRepeatPasswordValid && onBlurRepeatPassword && repeatPassword && (
            <p className="text-sm mt-1 text-red-600">
              Las contraseñas no coinciden
            </p>
          )}
          <button className="flex justify-center items-center md:hover:bg-primaryExtraDark md:transition-colors bg-primaryDark p-2 mt-5 text-white rounded font-normal">
            {loading ? (
              <ImSpinner8 className="animate-spin w-7 h-7" />
            ) : (
              "Restablecer"
            )}
          </button>
        </form>
      </article>
    </section>
  );
}

export default RestablecerClaveForm;

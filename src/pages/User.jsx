import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

function User() {
  const { token } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center justify-center mt-10">
      <div></div>
      <h3 className="text-xl">
        Bienvenido:{" "}
        <span className="bg-primaryDark px-2 py-1 text-white">
          {token.username.toUpperCase()}
        </span>{" "}
      </h3>
      <div className="mt-5 bg-primaryExtraDark text-white p-3 rounded-full w-10 h-10 flex justify-center items-center">
        {token.username.slice(0, 1).toUpperCase()}
      </div>
    </section>
  );
}

export default User;

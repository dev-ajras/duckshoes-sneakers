import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { token } = useContext(AppContext);

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;

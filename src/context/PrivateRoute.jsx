import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppProvider";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { token } = useContext(AppContext);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthStatus(true);
    }
  }, [token]);

  if (authStatus) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;

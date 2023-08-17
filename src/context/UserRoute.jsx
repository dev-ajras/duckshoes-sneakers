import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const { user } = useContext(AppContext);

  if (user.role === 0) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default UserRoute;

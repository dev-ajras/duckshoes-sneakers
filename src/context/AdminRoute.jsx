import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./AppProvider";

function AdminRoute() {
  const { user } = useContext(AppContext);

  if (user.role === 1) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;

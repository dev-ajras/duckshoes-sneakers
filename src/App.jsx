import "tailwindcss/tailwind.css";
import "./app.css";

import { Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppProvider";
import UserRoute from "./context/UserRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Favorites from "./pages/Favorites";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import ScrollToTop from "./helpers/ScrollToTop";
import Footer from "./components/Footer";
import Payment from "./pages/Payment";
import User from "./pages/User/User";
import RegisterAdmin from "./pages/RegisterAdmin";
import AdminRoute from "./context/AdminRoute";
import Admin from "./pages/Admin/Admin";
import Service from "./pages/Service/Service";
import RestablecerContraseña from "./pages/RestablecerContraseña";
import RestablecerClaveForm from "./pages/RestablecerClaveForm";

function App() {
  return (
    <AppProvider>
      <div className="bg-body flex flex-col items-center font-outfit font-light">
        <ScrollToTop />
        <Navbar />
        <main className="flex flex-col box-border pt-20 min-h-screen bg-body w-full md:pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:productSku/:productId"
              element={<ProductDetails />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/register" element={<Register />} />
            <Route path="register-admin" element={<RegisterAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/restablecer-contraseña"
              element={<RestablecerContraseña />}
            />
            <Route
              path="/restablecer-clave"
              element={<RestablecerClaveForm />}
            />
            <Route element={<UserRoute />}>
              <Route path="/user/*" element={<User />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>
            <Route path="/service/*" element={<Service />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;

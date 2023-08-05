import 'tailwindcss/tailwind.css';
import './app.css';

import { Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AppProvider';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import ProductDetails from './components/ProductDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Help from './pages/Help';
import NotFound404 from './pages/NotFound404';
import ScrollToTop from './helpers/ScrollToTop';
import Footer from './components/Footer';
import HowWeDeliver from './components/HowWeDeliver';
import HowToBuy from './components/HowToBuy';
import PaymentMethods from './components/PaymentMethods';

function App() {
  return (
    <div className="bg-body flex flex-col items-center font-outfit">
      <ScrollToTop />
      <Newsletter />
      <AppProvider>
        <Navbar />
        <main className="flex flex-col box-border mt-20 min-h-screen bg-body w-full md:mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productName" element={<ProductDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/help" element={<Help />} />
            <Route path="/service">
              <Route
                path="/service/how-we-deliver"
                element={<HowWeDeliver />}
              />
              <Route path="/service/how-to-buy" element={<HowToBuy />} />
              <Route
                path="/service/payment-methods"
                element={<PaymentMethods />}
              />
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;

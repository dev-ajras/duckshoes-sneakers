import 'tailwindcss/tailwind.css';

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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Newsletter />
      <AppProvider>
        <Navbar />
        <main className="flex flex-col box-border mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productName" element={<ProductDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
        <Footer/>
      </AppProvider>
    </div>
  );
}

export default App;

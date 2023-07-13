import 'tailwindcss/tailwind.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import ProductDetails from './components/ProductDetails';
import { AppProvider } from './context/AppProvider';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div>
      <Newsletter />
      <Navbar />
      <AppProvider>
        <main className="box-borde mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productName" element={<ProductDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </AppProvider>
    </div>
  );
}

export default App;

import 'tailwindcss/tailwind.css';

import { Routes, Route } from 'react-router-dom';

import SearchProduct from './components/SearchProduct';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';

function App() {
  return (
    <div className="box-border bg-body">
      <Newsletter />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;

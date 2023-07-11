import 'tailwindcss/tailwind.css';

import { Routes, Route } from 'react-router-dom';

import SearchProduct from './components/SearchProduct';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import ProductDetails from './components/ProductDetails';
import { ProductsProvider } from './context/ProductsProvider';

function App() {
  return (
    <div className="box-border bg-body">
      <Newsletter />
      <Navbar />
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productName" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ProductsProvider>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Navbar at the top */}
      <ToastContainer />
      <Navbar />
      
      {/* 2. Main Content Area (grows to fill space) */}
      < main className="flex-grow container mx-auto px-4 py-8">
      
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/checkout" element={<Checkout />} />
  {/* 2. Add this new Route line */}
  <Route path="/product/:id" element={<ProductDetails />} />

  <Route path="/cart" element={<Cart />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/my-orders" element={<MyOrders />} />
</Routes>
</main>
      {/* 3. Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;

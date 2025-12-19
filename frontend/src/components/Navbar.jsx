import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BookStore
        </Link>

        {/* Navigation Links - Only show when authenticated */}
        {isAuthenticated && (
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/shop" className="hover:text-blue-600 transition">Shop</Link>
            {!user?.isAdmin && (
              <Link to="/my-orders" className="hover:text-blue-600 transition">My Orders</Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="hover:text-blue-600 transition">Admin</Link>
            )}
          </div>
        )}

        {/* Icons (Cart & Login) */}
        <div className="flex items-center space-x-6">
          
          {/* Cart Icon - Only for regular users */}
          {isAuthenticated && !user?.isAdmin && (
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {/* Login/User/Logout */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm">
                {user?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition"
                title="Logout"
              >
                <FaSignOutAlt size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              <FaUser size={24} />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

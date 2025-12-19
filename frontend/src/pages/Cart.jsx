import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';   // ✅ Added useNavigate
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const dispatch = useDispatch();
  const navigate = useNavigate();   // ✅ Added navigate

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.info(`${title} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any books yet.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Side */}
        <div className="lg:w-2/3">
          {cartItems.map((item) => (
            <div key={item._id || item.id} className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded-lg border">
              
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.author}</p>
                  <span className="text-blue-600 font-bold mt-1 block">₹{Math.round(item.price)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center border rounded px-2 py-1">
                  <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                </div>

                <button
                  onClick={() => handleRemove(item._id || item.id, item.title)}
                  className="text-red-500 hover:text-red-700 transition p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <Link to="/shop" className="flex items-center text-blue-600 mt-6 hover:underline">
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow border sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{Math.round(cart.totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between mb-6 text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>₹{Math.round(cart.totalPrice)}</span>
            </div>

            {/* ✅ UPDATED BUTTON */}
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;

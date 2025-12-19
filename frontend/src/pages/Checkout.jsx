import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default Cash on Delivery

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to place an order");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        orderItems: cart.cartItems.map(item => ({
            title: item.title,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item.id || item._id || '507f1f77bcf86cd799439011'
        })),
        shippingAddress,
        paymentMethod,
        totalPrice: cart.totalPrice,
        user: user._id,
      };
      
      // Send to Backend with Authorization header
      await axios.post('http://localhost:5001/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      // Success
      toast.success("Order Placed Successfully!");
      dispatch(clearCart()); // Empty the cart
      navigate('/'); // Go back home
      
    } catch (error) {
      console.error('Order placement error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Order Failed. Try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left: Form */}
        <div className="md:w-2/3 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
          <form onSubmit={placeOrder} className="space-y-4">
            <input 
              name="address" 
              placeholder="Address" 
              onChange={handleChange} 
              className="w-full border p-2 rounded" 
              required 
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                name="city" 
                placeholder="City" 
                onChange={handleChange} 
                className="w-full border p-2 rounded" 
                required 
              />
              <input 
                name="postalCode" 
                placeholder="Postal Code" 
                onChange={handleChange} 
                className="w-full border p-2 rounded" 
                required 
              />
            </div>
            <input 
              name="country" 
              placeholder="Country" 
              onChange={handleChange} 
              className="w-full border p-2 rounded" 
              required 
            />

            <h3 className="text-xl font-bold mt-6 mb-4">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  value="COD" 
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  value="Card" 
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit/Debit Card (Simulated)</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded mt-4 hover:bg-green-700">
              Place Order (₹{cart.totalPrice})
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="md:w-1/3 bg-gray-50 p-6 rounded shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          {cart.cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2 text-sm">
              <span>{item.title} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2">
            <span>Total:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;

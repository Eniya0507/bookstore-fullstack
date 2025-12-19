import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBox, FaClock, FaCheckCircle } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get(`https://bookstore-6afw.onrender.com/api/orders/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchMyOrders();
    }
  }, [user, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FaBox className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 border">
              
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-8)}</h3>
                  <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{Math.round(order.totalPrice)}</div>
                  <div className="flex items-center mt-1">
                    {order.orderStatus === 'Pending' && <FaClock className="text-yellow-500 mr-1" />}
                    {order.orderStatus === 'Confirmed' && <FaCheckCircle className="text-blue-500 mr-1" />}
                    {order.orderStatus === 'Processing' && <FaClock className="text-purple-500 mr-1" />}
                    {order.orderStatus === 'Shipped' && <FaBox className="text-indigo-500 mr-1" />}
                    {order.orderStatus === 'Delivered' && <FaCheckCircle className="text-green-500 mr-1" />}
                    {order.orderStatus === 'Rejected' && <FaClock className="text-red-500 mr-1" />}
                    <span className={`text-sm ${
                      order.orderStatus === 'Pending' ? 'text-yellow-600' :
                      order.orderStatus === 'Confirmed' ? 'text-blue-600' :
                      order.orderStatus === 'Processing' ? 'text-purple-600' :
                      order.orderStatus === 'Shipped' ? 'text-indigo-600' :
                      order.orderStatus === 'Delivered' ? 'text-green-600' :
                      'text-red-600'
                    }`}>
                      {order.orderStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Items Ordered:</h4>
                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Shipping Address:</h4>
                  <p className="text-gray-600">
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Payment Method:</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.paymentMethod === 'COD' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Order Status */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm">Order Confirmed</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-yellow-500 mr-2" />
                      <span className="text-sm">Processing</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaBox className="mr-2" />
                      <span className="text-sm">Shipped</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Expected delivery: 2-3 business days
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox, FaPlus, FaList, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: 'Fiction',
    description: '',
    image: '',
    stock: ''
  });

  // Stock update state
  const [stockUpdates, setStockUpdates] = useState({});

  // 1. Fetch Products from Backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5002/api/books');
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch Orders from Backend
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5002/api/orders', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5002/api/books');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const loadOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5002/api/orders', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    loadProducts();
    loadOrders();
  }, []);

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit (Add Book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      await axios.post('http://localhost:5002/api/books', formData);
      
      toast.success("Book Added Successfully!");
      
      // Reset form
      setFormData({ title: '', author: '', price: '', category: 'Fiction', description: '', image: '', stock: '' });
      
      // Refresh list
      fetchProducts();
      setActiveTab('products');
      
    } catch {
      toast.error("Error adding book. Please check fields.");
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5002/api/books/${id}`);
        toast.success("Book deleted successfully!");
        fetchProducts(); // Refresh the list
      } catch  {
        toast.error("Error deleting book");
      }
    }
  };

  // Handle stock update
  const handleStockUpdate = async (bookId, newStock) => {
    try {
      await axios.put(`http://localhost:5002/api/books/${bookId}/stock`, { stock: newStock });
      toast.success('Stock updated successfully!');
      fetchProducts();
      setStockUpdates({ ...stockUpdates, [bookId]: '' });
    } catch  {
      toast.error('Error updating stock');
    }
  };

  const handleStockInputChange = (bookId, value) => {
    setStockUpdates({ ...stockUpdates, [bookId]: value });
  };

  // Handle Order Status Update
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    console.log('Updating order:', orderId, 'to status:', newStatus);
    try {
      const response = await axios.put(`http://localhost:5002/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      console.log('Update response:', response.data);
      const message = newStatus === 'Rejected' ? 'Order rejected successfully!' : `Order ${newStatus.toLowerCase()} successfully!`;
      toast.success(message);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Order update error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || "Error updating order status");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="mt-6 px-4 space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center p-3 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
            <FaList className="mr-3" /> All Products
          </button>
          <button onClick={() => setActiveTab('add')} className={`w-full flex items-center p-3 rounded ${activeTab === 'add' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
            <FaPlus className="mr-3" /> Add New Book
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center p-3 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
            <FaBox className="mr-3" /> Orders ({orders.length})
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        
        {/* VIEW: PRODUCT LIST */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Product Inventory</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Update Stock</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((book) => (
                    <tr key={book._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{book.title}</td>
                      <td className="py-3 px-4">₹{book.price}</td>
                      <td className="py-3 px-4">{book.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          book.stock === 0 ? 'bg-red-100 text-red-800' :
                          book.stock < 10 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {book.stock || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={stockUpdates[book._id] || ''}
                            onChange={(e) => handleStockInputChange(book._id, e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm"
                            placeholder="New"
                          />
                          <button
                            onClick={() => handleStockUpdate(book._id, stockUpdates[book._id])}
                            disabled={!stockUpdates[book._id]}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => handleDelete(book._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: ADD PRODUCT FORM */}
        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Title</label>
                <input name="title" value={formData.title} onChange={handleChange} type="text" className="w-full border rounded p-2" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Author</label>
                  <input name="author" value={formData.author} onChange={handleChange} type="text" className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Price</label>
                  <input name="price" value={formData.price} onChange={handleChange} type="number" className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Stock</label>
                  <input name="stock" value={formData.stock} onChange={handleChange} type="number" min="0" className="w-full border rounded p-2" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} type="text" className="w-full border rounded p-2" placeholder="http://image.com/book.jpg" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded p-2">
                  <option>Fiction</option>
                  <option>Finance</option>
                  <option>Programming</option>
                  <option>Self-Help</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2 h-24" required></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700">Publish Book</button>
            </form>
          </div>
        )}

        {/* VIEW: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Order Statistics</h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{Math.round(orders.reduce((sum, order) => sum + order.totalPrice, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {orders.filter(order => order.orderStatus === 'Delivered').length}
                  </div>
                  <div className="text-sm text-gray-600">Orders Delivered</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order._id.slice(-8)}</td>
                      <td className="py-3 px-4">{order.user?.name || 'Unknown'}</td>
                      <td className="py-3 px-4">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.title} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 font-semibold">₹{Math.round(order.totalPrice)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.paymentMethod === 'COD' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.orderStatus === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.orderStatus === 'Processing' ? 'bg-purple-100 text-purple-800' :
                          order.orderStatus === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
                          order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.orderStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <select 
                            onChange={(e) => {
                              if (e.target.value !== (order.orderStatus || 'Pending')) {
                                handleOrderStatusUpdate(order._id, e.target.value);
                              }
                            }}
                            className="text-xs border rounded px-2 py-1"
                            value={order.orderStatus || 'Pending'}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;

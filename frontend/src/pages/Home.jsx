import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* 1. Hero Section (Banner) */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center rounded-lg shadow-xl mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to BookStore</h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover your next favorite read from our exclusive collection.
        </p>
        <Link 
          to="/shop" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* 2. Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-blue-600 text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-500">Get your books delivered to your doorstep within 24 hours.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-blue-600 text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-500">100% secure payment gateways with multiple options.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-blue-600 text-4xl mb-4">❤️</div>
          <h3 className="text-xl font-bold mb-2">Best Quality</h3>
          <p className="text-gray-500">We ensure the best paper quality for a great reading experience.</p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Books Coming Soon!</h2>
        <p className="text-gray-600">Start your backend server to see books.</p>
      </div>
    </div>
  );
};

export default Home;

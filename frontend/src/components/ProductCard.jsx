import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success(`${book.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      
      {/* 1. Image Link - CHANGED book.id TO book._id */}
      <Link to={`/product/${book._id}`}>
        <div className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer">
          <img 
            src={book.image} 
            alt={book.title} 
            className="h-full w-full object-cover" 
          />
        </div>
      </Link>

      {/* Book Details */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider">
          {book.category || 'General'}
        </span>
        
        {/* 2. Title Link - CHANGED book.id TO book._id */}
        <Link to={`/product/${book._id}`}>
          <h3 className="text-lg font-bold text-gray-800 mt-1 truncate hover:text-blue-600 transition">
            {book.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500">{book.author}</p>

        {/* Stock Status */}
        <div className="mt-2">
          {book.stock > 0 ? (
            <span className="text-sm text-green-600 font-medium">
              {book.stock} in stock
            </span>
          ) : (
            <span className="text-sm text-red-600 font-medium">
              Out of stock
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-end items-center mt-4">
          <span className="text-lg font-bold text-gray-900">₹{Math.round(book.price)}</span>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={book.stock === 0}
          className={`mt-4 w-full py-2 rounded flex items-center justify-center transition ${
            book.stock === 0 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <FaShoppingCart className="mr-2" /> 
          {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

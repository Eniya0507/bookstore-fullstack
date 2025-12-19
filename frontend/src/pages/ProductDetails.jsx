import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Fetch single book by ID
        const { data } = await axios.get(`http://localhost:5001/api/books/${id}`);
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success(`${book.title} added to cart!`);
  };

  if (loading) return <div className="text-center py-20"><h2>Loading...</h2></div>;
  if (!book) return <div className="text-center py-20"><h2>Book not found!</h2></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="flex items-center text-gray-600 mb-6 hover:text-blue-600">
        <FaArrowLeft className="mr-2" /> Back to Shop
      </Link>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-lg shadow-sm">
        <div className="md:w-1/3 flex justify-center bg-gray-100 rounded-lg p-4">
          <img src={book.image} alt={book.title} className="max-h-96 object-contain shadow-md" />
        </div>

        <div className="md:w-2/3 flex flex-col justify-center">
          <span className="text-blue-600 font-semibold uppercase tracking-wide">
            {book.category} {/* Ensure your DB data has this field or handle it safely */}
          </span>
          
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-500 mb-4">by <span className="font-medium text-gray-800">{book.author}</span></p>

          <div className="flex items-center mb-6">
             <span className="text-3xl font-bold text-gray-900">₹{book.price}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>

          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center hover:bg-blue-700 transition shadow-lg w-max"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

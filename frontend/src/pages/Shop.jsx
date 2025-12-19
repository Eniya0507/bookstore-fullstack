import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5002/api/books');
        setBooks(data);
        setFilteredBooks(data);
        
        // Get unique categories
        const uniqueCategories = ['All', ...new Set(data.map(book => book.category))];
        setCategories(uniqueCategories);
        
        // Check for category filter from URL
        const urlParams = new URLSearchParams(location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
          setFilteredBooks(data.filter(book => book.category === categoryParam));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [location]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.category === category));
    }
  };

  if (loading) return <div className="text-center py-20"><h2>Loading Books...</h2></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Shop Books
      </h2>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <ProductCard key={book._id} book={book} />
        ))}
      </div>
      
      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">No books found in this category</h3>
        </div>
      )}
    </div>
  );
};

export default Shop;

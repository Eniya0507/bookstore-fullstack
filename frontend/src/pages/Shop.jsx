import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import axios from 'axios';
import API_BASE_URL from '../config/api';

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
        const { data } = await axios.get(`${API_BASE_URL}/api/books`);
        setBooks(data);
        setFilteredBooks(data);
        
        // Get unique categories
        const uniqueCategories = [...new Set(data.map(book => book.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [location]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBooks(books);
      return;
    }
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleFilter = ({ category, priceRange, sortBy }) => {
    let filtered = [...books];

    // Category filter
    if (category) {
      filtered = filtered.filter(book => book.category === category);
    }

    // Price filter
    if (priceRange.min) {
      filtered = filtered.filter(book => book.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(book => book.price <= parseInt(priceRange.max));
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredBooks(filtered);
  };

  if (loading) return <div className="text-center py-20"><h2>Loading Books...</h2></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Shop Books
      </h2>

      {/* Search & Filter */}
      <SearchFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
      />

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <ProductCard key={book._id} book={book} />
        ))}
      </div>
      
      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">No books found</h3>
        </div>
      )}
    </div>
  );
};

export default Shop;
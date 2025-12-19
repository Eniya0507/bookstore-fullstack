import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2025 BookStore E-Commerce. All rights reserved.</p>
        <div className="flex justify-center space-x-4 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;